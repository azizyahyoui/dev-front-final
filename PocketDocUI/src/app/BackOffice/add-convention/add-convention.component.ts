import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConventionService } from 'src/app/oumC/service/convention.service';

@Component({
  selector: 'app-add-convention',
  templateUrl: './add-convention.component.html',
  styleUrls: ['./add-convention.component.css']
})
export class AddConventionComponent implements OnInit {
  @Input() userId: number | null = null;
  conventionForm!: FormGroup;
  

  constructor(private fb: FormBuilder, private conventionService: ConventionService, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
   
  }

  initializeForm(): void {
    this.conventionForm = this.fb.group({
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      description: ['', Validators.required],
      reductionFraisConsultation: ['', [Validators.required, this.percentageValidator]],
      servicesInclus: this.fb.array([]),
      conditionsResiliation: this.fb.array([])
    });
  }

  addConvention(): void {
    if (this.conventionForm.valid && this.userId !== null) {
      // Votre code existant pour ajouter une convention
      const dateDebut = new Date(this.conventionForm.value.dateDebut);
      const dateFin = new Date(this.conventionForm.value.dateFin);
      const dureeConvention = (dateFin.getTime() - dateDebut.getTime()) / (1000 * 3600 * 24 * 30.44);
  
      if (dureeConvention < 6 || dureeConvention > 12) {
        alert("La durée de la convention doit être comprise entre 6 mois et 1 an.");
        return;
      }
  
      if (dateFin < dateDebut) {
        alert("La date de fin ne peut pas être antérieure à la date de début.");
        return;
      }
  
      let reductionFraisConsultation = parseFloat(this.conventionForm.value.reductionFraisConsultation);
      // Convertir le pourcentage en décimal si c'est 15%, 25%, ou 50%
      if (reductionFraisConsultation === 15 || reductionFraisConsultation === 25 || reductionFraisConsultation === 50) {
        reductionFraisConsultation /= 100;
      }
  
      const servicesInclusString = this.servicesInclus.value.join('******');
      const conditionsResiliationString = this.conditionsResiliation.value.join('******');
  
      const newConventionData = {
        ...this.conventionForm.value,
        reductionFraisConsultation: reductionFraisConsultation, // Utiliser la valeur convertie
        servicesInclus: servicesInclusString,
        conditionsResiliation: conditionsResiliationString
      };
  
      this.conventionService.addConvention(newConventionData, this.userId).subscribe(
        (response) => {
          console.log('Convention ajoutée avec succès !');
          alert('Convention ajoutée avec succès !');
          this.conventionForm.reset();
          
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la convention : ', error);
          alert('Une erreur est survenue lors de l\'ajout de la convention.');
        }
      );
    } else {
      console.error('Formulaire invalide ou userId est null ! Veuillez remplir tous les champs et sélectionner un utilisateur.');
      alert('Veuillez remplir tous les champs du formulaire et sélectionner un utilisateur.');
    }
  }
  
  cancel(): void {
    // Méthode pour annuler l'opération
    this.router.navigate(['/admin/demback']); // Naviguer vers une autre page par exemple
  }

  percentageValidator(control: any): { [key: string]: any } | null {
    const value = control.value;
    if (isNaN(value)) {
      return { 'invalidPercentage': true };
    }
    const floatValue = parseFloat(value);
    if (floatValue < 0 || floatValue > 1) {
      return { 'invalidPercentageRange': true };
    }
    return null;
  }

  get servicesInclus(): FormArray {
    return this.conventionForm.get('servicesInclus') as FormArray;
  }

  get conditionsResiliation(): FormArray {
    return this.conventionForm.get('conditionsResiliation') as FormArray;
  }

  addServiceInclus(): void {
    this.servicesInclus.push(this.fb.control('', Validators.required));
  }

  addConditionResiliation(): void {
    this.conditionsResiliation.push(this.fb.control('', Validators.required));
  }
}
