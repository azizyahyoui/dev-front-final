import { Component, Input, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConventionService } from 'src/app/oumC/service/convention.service';
import { FileServiceService } from 'src/app/oumC/service/file-service.service';

@Component({
  selector: 'app-dem-back',
  templateUrl: './dem-back.component.html',
  styleUrls: ['./dem-back.component.css']
})
export class DemBackComponent {
  @Input() userId: number | null = null; //
  filesWithUserIds: any[] = [];
  selectedUserId: number | null = null;
  conventionForm!: FormGroup;

  constructor(private fileService: FileServiceService, private fb: FormBuilder, private conventionService: ConventionService, private router: Router) { }
   
  
  ngOnInit(): void {
    this.getFilesWithUserIds();
    this.initializeForm();
  }
  
  initializeForm(): void {
    this.conventionForm = this.fb.group({
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      description: ['', Validators.required],
      reductionFraisConsultation: ['', [Validators.required, this.percentageValidator]],
      servicesInclus: ['', Validators.required], // Ajout du champ "serviceInclus"
      conditionsResiliation: ['', Validators.required], // Ajout du champ "conditionResiliation"
      cin: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]] 
    });
  }
  



addConvention(): void {
  if (this.conventionForm.valid && this.userId !== null) {
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
    if (reductionFraisConsultation === 15 || reductionFraisConsultation === 25 || reductionFraisConsultation === 50) {
      reductionFraisConsultation /= 100;
    }

    const newConventionData = {
      ...this.conventionForm.value,
      reductionFraisConsultation: reductionFraisConsultation,
      servicesInclus: this.conventionForm.value.servicesInclus, // Champ "Service inclus"
      conditionsResiliation: this.conventionForm.value.conditionsResiliation, // Champ "Condition de résiliation"
      cin: this.conventionForm.value.cin 
    };

    this.conventionService.addConvention(newConventionData, this.userId).subscribe(
      (response) => {
        console.log('Convention ajoutée avec succès !');
        alert('Convention ajoutée avec succès !');
        this.conventionForm.reset();
        this.closeConventionModal();
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



  openConventionModal(userId: number): void {
    const modal = document.getElementById('conventionModal');
    if (modal) {
      modal.style.display = 'block'; // Affiche la modal
      this.userId = userId;
    }
  }
  
  closeConventionModal(): void {
    this.selectedUserId = null; // Réinitialise l'ID de l'utilisateur sélectionné
    const modal = document.getElementById('conventionModal');
    if (modal) {
      modal.style.display = 'none'; // Masque la modal
    }
  }

  getFilesWithUserIds(): void {
    this.fileService.getFilesWithUserIds().subscribe(
      (data: any[]) => {
        this.filesWithUserIds = data;
        console.log(this.filesWithUserIds); // Afficher les données récupérées dans la console
      },
      error => {
        console.error('Erreur lors de la récupération des fichiers avec les IDs des utilisateurs:', error);
      }
    );
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
  downloadFile(fileId: number, fileName: string): void {
    this.fileService.downloadFile(fileId).subscribe((response: any) => {
      const contentType = response.headers.get("Content-Type");
      const blobPart = response.body;

      if (blobPart) {
        const blob = new Blob([blobPart], { type: contentType });

        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;

        link.click();

        window.URL.revokeObjectURL(link.href);
        link.remove();
      } else {
        console.log("Impossible d'extraire le fichier");
      }
    });
  }

  deleteFile(fileId: number): void {
    if (confirm("Voulez-vous vraiment supprimer ce fichier?")) {
      this.fileService.deleteFile(fileId).subscribe(
        () => {
          alert("Fichier supprimé avec succès!");
          // Mettre à jour la liste des fichiers après la suppression
          this.getFilesWithUserIds();
        },
        error => {
          console.error('Erreur lors de la suppression du fichier:', error);
          // Gérer les erreurs ici, par exemple afficher un message à l'utilisateur
        }
      );
    }
  }
  isImageFile(file: any): boolean {
    return file.contentType.startsWith('image/');
  }
  cancel(): void {
    // Méthode pour annuler l'opération
    this.router.navigate(['/admin/demback']); // Naviguer vers une autre page par exemple
  }
}