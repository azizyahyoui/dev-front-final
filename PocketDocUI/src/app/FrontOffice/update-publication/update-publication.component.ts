import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Publication } from 'src/app/module/Module/Publication';
import { PublicationService } from 'src/app/Services/publication.service';

@Component({
  selector: 'app-update-publication',
  templateUrl: './update-publication.component.html',
  styleUrls: ['./update-publication.component.css']
})
export class UpdatePublicationComponent implements OnInit {
  id!: number;
  updateForm!: FormGroup;
  selectedPublication!: Publication;
  publicationId!: number;
  publicationDetails: any; // Assurez-vous d'utiliser le bon type ici
  publications: any = [];

  constructor(
    private route: ActivatedRoute,
    private publicationService: PublicationService,
    private router: Router, // Ajoutez Router ici
    private fb: FormBuilder // Ajoutez FormBuilder ici si vous l'utilisez
  ) {}

  /*ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.publicationId = params['id'];
      // Utilisez this.publicationId pour charger les détails de la publication à mettre à jour
      this.loadPublicationDetails();
    })
  }*/

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        const publication = params['publication'];
        if (publication) {
            this.selectedPublication = publication;
            // Initialisez les valeurs du formulaire avec les propriétés de la publication sélectionnée
            this.updateForm.patchValue({
                sujet: this.selectedPublication.sujet,
                contenuPub: this.selectedPublication.contenuPub
            });
        } else {
            console.error('Publication non spécifiée.');
        }
    });
}


  loadPublicationDetails() {
    // Utilisez this.publicationId pour charger les détails de la publication à mettre à jour
    this.publicationService.getPublication(this.publicationId).subscribe(
      (publication: any) => {
        this.publicationDetails = publication;
      },
      (error: any) => {
        console.error('Error loading publication details:', error);
      }
    );
  }

  /*updatePublication() {
    if (this.updateForm.valid && this.selectedPublication) {
      const formData = this.updateForm.value;
      this.publicationService.updatePublication(this.selectedPublication.idPub, formData).subscribe(
        (updatedPublication) => {
          console.log('Publication mise à jour avec succès :', updatedPublication);

          // Naviguer vers la page de détail de la publication mise à jour
          this.router.navigate(['/publication', this.selectedPublication.idPub]);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la publication :', error);
        }
      );
    }
  }*/

  getAllPublications(): void {
    this.publicationService.getAllPublications().subscribe(
      (res: Publication[]) => {
        this.publications = res;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des publications :', error);
      }
    );}


  /*updatePublication() {
    if (this.updateForm.valid && this.selectedPublication) {
      const formData = this.updateForm.value;
      // Mettez à jour les valeurs de la publication sélectionnée avec les nouvelles valeurs du formulaire
      this.selectedPublication.sujet = formData.sujet;
      this.selectedPublication.contenuPub = formData.contenuPub;
      // Appelez la fonction de mise à jour du service avec l'identifiant de la publication sélectionnée et les nouvelles valeurs
      this.publicationService.updatePublication(this.selectedPublication.idPub, this.selectedPublication).subscribe(
        (updatedPublication) => {
          console.log('Publication mise à jour avec succès :', updatedPublication);
          // Fermez le modal après la mise à jour
          const updateModal = document.getElementById('updatePublicationModal');
          if (updateModal) {
            updateModal.classList.remove('show');
            document.body.classList.remove('modal-open');
          }
          // Mettez à jour la liste des publications après la mise à jour
          this.getAllPublications();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la publication :', error);
        }
      );
    }
  }
*/

updatePublication() {
  if (this.updateForm.valid && this.selectedPublication) {
    const formData = this.updateForm.value;
    // Appelez la fonction de mise à jour du service avec l'identifiant de la publication sélectionnée et les nouvelles valeurs
    this.publicationService.updatePublication(this.selectedPublication.idPub, formData).subscribe(
      (updatedPublication) => {
        console.log('Publication mise à jour avec succès :', updatedPublication);
        // Fermez le modal après la mise à jour
        const updateModal = document.getElementById('updatePublicationModal');
        if (updateModal) {
          updateModal.classList.remove('show');
          document.body.classList.remove('modal-open');
        }
        // Mettez à jour la liste des publications après la mise à jour
        this.getAllPublications();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la publication :', error);
      }
    );
  }
}






}
