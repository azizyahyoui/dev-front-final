import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConventionService } from 'src/app/oumC/service/convention.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-conv-back',
  templateUrl: './conv-back.component.html',
  styleUrls: ['./conv-back.component.css']
})
export class ConvBackComponent implements OnInit {
  conventions: any[] = [];
  isModalOpen: boolean = false;
  conventionId!: number;
  conventionForm!: FormGroup;
  servicesInclus: FormArray<FormGroup> = new FormArray<FormGroup>([]);
  conditionsResiliation: FormArray<FormGroup> = new FormArray<FormGroup>([]);


  constructor(
    private fb: FormBuilder, 
    private conventionService: ConventionService, 
    private router: Router, 
    private route: ActivatedRoute
) {
    // Supprimer les initialisations des FormArray dans le constructeur
}

ngOnInit(): void {
    this.loadConventions();
    this.initializeForm();
    this.servicesInclus = this.fb.array([this.fb.group({})]); // Spécifier le type de FormGroup
    this.conditionsResiliation = this.fb.array([this.fb.group({})]); // Spécifier le type de FormGroup
}

  // Assurez-vous que servicesInclus et conditionsResiliation sont initialisés correctement dans votre méthode initializeForm()

  initializeForm(): void {
    this.conventionForm = this.fb.group({
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      description: ['', Validators.required],
      reductionFraisConsultation: ['', [Validators.required, this.percentageValidator]],
      servicesInclus: this.fb.array([]),
      conditionsResiliation: this.fb.array([]),
      cin: ['', Validators.required] 
    });
  }
  
  

  loadConventions(): void {
    this.conventionService.getConventions().subscribe(
      (data: any[]) => {
        this.conventions = data.map(convention => {
          // Formater les dates
          const formattedConvention = {
            ...convention,
            date_deb: this.formatDate(convention.date_deb),
            date_fin: this.formatDate(convention.date_fin)
          };
          return formattedConvention;
        });
      },
      (error: any) => {
        console.error('Error loading conventions:', error);
      }
    );
  }
  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  

  supprimerConvention(idConvention: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette convention ?')) {
      this.conventionService.supprimerConvention(idConvention).subscribe(() => {
        // Mettre à jour la liste des conventions après la suppression
        this.loadConventions();
      });
    }
  }

  openUpdateModal(idConvention: number): void {
    this.conventionId = idConvention;
    const conventionToUpdate = this.conventions.find(convention => convention.id === idConvention);
    if (conventionToUpdate) {
        this.conventionForm.patchValue({
            dateDebut: conventionToUpdate.date_deb,
            dateFin: conventionToUpdate.date_fin,
            description: conventionToUpdate.description,
            reductionFraisConsultation: conventionToUpdate.pourcentage_reduc,
            cin: conventionToUpdate.cin, // Assurez-vous que cin est correctement affecté ici
        });

        const modalDiv = document.getElementById('updateModal');
        if (modalDiv != null) {
            modalDiv.style.display = 'block';
        }
    } else {
        console.error('Convention non trouvée pour mise à jour.');
    }
}





  
  closeUpdateModal() {
    const modalDiv = document.getElementById('updateModal');
    if (modalDiv!=null) {
      modalDiv.style.display = 'none';
    }
  }

  updateConvention(): void {
    const updatedConventionData = this.conventionForm.value;
    updatedConventionData.servicesInclus = this.getServicesInclusString();
    updatedConventionData.conditionsResiliation = this.getConditionsResiliationString();

    this.conventionService.updateConvention(this.conventionId, updatedConventionData).subscribe(
        (response: any) => {
            console.log('Convention updated successfully!');
            alert('Convention updated successfully!');
            this.closeUpdateModal();
        },
        (error: any) => {
            console.error('Error updating convention:', error);
            alert('An error occurred while updating the convention.');
        }
    );
}

  getServicesInclusString(): string {
    const servicesInclusFormArray = this.conventionForm.get('servicesInclus') as FormArray;
    const phrases = servicesInclusFormArray.controls.map(control => control.value);
    return phrases.join('******');
  }

  getConditionsResiliationString(): string {
    const conditionsResiliationFormArray = this.conventionForm.get('conditionsResiliation') as FormArray;
    const phrases = conditionsResiliationFormArray.controls.map(control => control.value);
    return phrases.join('******');
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

  addServiceInclus(): void {
    (this.conventionForm.get('servicesInclus') as FormArray).push(this.fb.control('', Validators.required));
  }

  addConditionResiliation(): void {
    (this.conventionForm.get('conditionsResiliation') as FormArray).push(this.fb.control('', Validators.required));
  }

  removeServiceInclus(index: number): void {
    (this.conventionForm.get('servicesInclus') as FormArray).removeAt(index);
  }

  removeConditionResiliation(index: number): void {
    (this.conventionForm.get('conditionsResiliation') as FormArray).removeAt(index);
  }
}
