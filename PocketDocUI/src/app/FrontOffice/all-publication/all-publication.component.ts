import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Publication } from 'src/app/module/Module/Publication';
import { PublicationService } from 'src/app/Services/publication.service';
import { CommentaireService } from 'src/app/Services/commentaire.service';
import { UpdatePublicationComponent } from '../update-publication/update-publication.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Commentaire } from 'src/app/module/Module/Commentaire';
import { Observable } from 'rxjs';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {PaginatePipe} from "ngx-pagination";



@Component({
  selector: 'app-all-publication',
  templateUrl: './all-publication.component.html',
  styleUrls: ['./all-publication.component.css']
})
export class AllPublicationComponent {
  showOtherButtons: boolean = false; // Ajout de la variable showOtherButtons
  searchTerm: string = '';
  badWordsDetected: boolean = false;

  isEditMode = false;
  publications: any = [];
  validateForm!: FormGroup;
  @Output() publicationCreated = new EventEmitter<void>();
  id: number;
  updateForm: FormGroup;
  selectedPublication!: Publication;
  comments: Commentaire[] = [];
  newCommentForm: FormGroup;
  newCommentFormEdit: FormGroup;
  idCommentForEdit: any;
  @Output() commentaireAjoute: EventEmitter<Commentaire> = new EventEmitter<Commentaire>();
  pagedPublications: any[] = [];
  currentPage = 1;
  pageSize = 5;

  selectedComment: any;

  constructor(
    private publicationService: PublicationService,
    private commentaireService: CommentaireService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
) {
    this.id = this.route.snapshot.params['id'];
    this.updateForm = this.fb.group({
        sujet: ['', Validators.required],
        contenuPub: ['', Validators.required],
    });
    this.selectedPublication = new Publication(); // Initialisez selectedPublication

    this.newCommentForm = this.fb.group({
        contenuCom: ['', Validators.required]
    });
    this.newCommentFormEdit = this.fb.group({
      contenuCom: ['', Validators.required]
    });
}



ngOnInit()
{
  // Récupérer num page à partir params de requête dans l'URL
  this.route.queryParams.subscribe(params => {
    this.currentPage = params['page'] || 1;
    // Charger les publications en fonction de la page actuelle
    this.getAllPublications();
  });
  this.validateForm = this.fb.group({
    sujet: [null, [Validators.required]],
    contenuPub: [null, [Validators.required]],
    datePub: [this.getCurrentDate(), [Validators.required]]
  })
  this.newCommentForm = this.fb.group({
    contenuCom: ['', [Validators.required]],
    dateCom: [this.getCurrentDate(), [Validators.required]]
  });
  

  // Ajoutez le code pour écouter le défilement de la fenêtre et afficher ou masquer le bouton "Add Post" en conséquence
  window.addEventListener('scroll', () => {
    const footer = document.querySelector('footer');
    const button = document.querySelector('.add-publication-button');

    if (footer && button) { // Vérifie si les éléments existent
      const footerRect = footer.getBoundingClientRect();
      if (footerRect.top < window.innerHeight) {
        button.classList.add('hide-button');
      } else {
        button.classList.remove('hide-button');
      }
    }
  });}



  /*Méthode pour récupérer la liste des publications
  getAllPublications(): void {
    console.log('hello')
    this.publicationService.getAllPublications().subscribe(
      (res) => {
        console.log('result', res)
        this.publications = res;
        this.setPage(1);
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des publications :', error);
      }
    );}*/

    getAllPublications(): void {
      const currentPage = this.currentPage;
      if (this.searchTerm.trim() !== '') {
        // Si le terme de recherche n'est pas vide, effectuez une recherche par sujet
        this.searchPublications();
      } else {
        // Sinon, récupérez les pub
        this.publicationService.getAllPublications().subscribe(
          (res) => {
            console.log('Résultat de la récupération des publications :', res);
            this.publications = res;
            this.setPage(currentPage);
          },
          (error: any) => {
            console.error('Erreur lors de la récupération des publications :', error);
          }
        );
      }
    }
    

 
  deletePublication(id: number): void {
    this.publicationService.deletePublication(id).subscribe(
      () => {
        this.getAllPublications();
      },
      (error: any) => {
        console.error('Error deleting publication:', error);
      }
    );
  }

  // Méthode pour obtenir la date actuelle
  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    let month: string | number = today.getMonth() + 1;
    let day: string | number = today.getDate();

    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }

    return `${year}-${month}-${day}`;
  }



  /*postPublication() {
  console.log('Tentative d\'ajout de publication...');
  const currentDate = this.getCurrentDate(); // Obtenez la date actuelle
  this.publicationService.postPublication(this.validateForm.value).subscribe(
    (res) => {
      console.log('Réponse du serveur :', res);
      // Réinitialiser le formulaire pour vider les champs
      this.validateForm.reset();
      // Réinitialiser la valeur du champ de date à la date actuelle
      this.validateForm.patchValue({ datePub: currentDate });
      // Fermer la fenêtre modale
      const publicationModal = document.getElementById('publicationModal');
      if (publicationModal) {
        publicationModal.classList.remove('show'); // Retirez la classe 'show' pour fermer la fenêtre modale
      }
      // Mettre à jour la liste des publications après l'ajout de la nouvelle publication
      this.getAllPublications();
    },
    (error) => {
      console.error('Erreur lors de l\'ajout de la publication :', error);
    }
  )
}*/

postPublication() {
  console.log('Tentative d\'ajout de publication...');
  const currentDate = this.getCurrentDate(); // Obtenez la date actuelle

  this.publicationService.postPublication(this.validateForm.value).subscribe(
    (res) => {
      console.log('Réponse du serveur :', res);
      // Réinitialiser le formulaire pour vider les champs
      this.validateForm.reset();
      // Réinitialiser la valeur du champ de date à la date actuelle
      this.validateForm.patchValue({ datePub: currentDate });
      // Fermer la fenêtre modale
      const publicationModal = document.getElementById('publicationModal');
      if (publicationModal) {
        publicationModal.classList.remove('show'); // Retirez la classe 'show' pour fermer la fenêtre modale
      }
      // Mettre à jour la liste des publications après l'ajout de la nouvelle publication
      this.getAllPublications();
      // Réinitialiser l'état de la détection des mots inappropriés
      this.badWordsDetected = false;
    },
    (error) => {
      console.error('Erreur lors de l\'ajout de la publication :', error);
      if (error.status === 400) {
        // Mettre à jour l'état de la détection des mots inappropriés
        this.badWordsDetected = true;
      }
    }
  );
}




  likePublication(idPub: number): void {
    this.publicationService.likePublication(idPub).subscribe(() => {
      // Mettre à jour la liste des publications après avoir aimé une publication
      this.getAllPublications();
    });
  }

  dislikePublication(idPub: number): void {
    this.publicationService.dislikePublication(idPub).subscribe(() => {
      // Mettre à jour la liste des publications après avoir désaimé une publication
      this.getAllPublications();
    });
  }


  openUpdateModal(publicationId: number): void {
    // Récupérer la publication à partir de son ID
    const publicationToUpdate = this.publications.find((pub: Publication) => pub.idPub === publicationId);
    if (publicationToUpdate) {
      this.selectedPublication = publicationToUpdate;
      // Ouvrir la modal de mise à jour
      const updateModal = document.getElementById('updatePublicationModal');
      if (updateModal) {
          updateModal.classList.add('show');
          document.body.classList.add('modal-open');
      }
      // Initialisez les valeurs du formulaire avec les propriétés de la publication sélectionnée
      this.updateForm.patchValue({
        sujet: this.selectedPublication.sujet,
        contenuPub: this.selectedPublication.contenuPub
      });
    } else {
      console.error('Publication non trouvée avec ID:', publicationId);
    }
  }


updatePublication() {
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


openCommentModal(): void {
  // Ouvrir le modal d'ajout de commentaire en utilisant l'identifiant du modal
  const commentModal = document.getElementById('commentModal');
  if (commentModal) {
    commentModal.classList.add('show');
    document.body.classList.add('modal-open');
  }
}


ajouterCommentaire(publicationId: number) {
  console.log('pubId', publicationId)
  if (this.selectedComment) {
    publicationId = this.selectedComment.idPub
  }
  let idComm: any;
  this.newCommentForm.value.dateCom = this.getCurrentDate();
  const contenuCom = this.newCommentForm.value.contenuCom;
  console.log('newCommentForm', this.newCommentForm)
  console.log('contenuCom', contenuCom)

    const nouveauCommentaire = {
      contenuCom: contenuCom,
      publicationIdPub: publicationId,
      dateCom: this.getCurrentDate()
    };

    console.log('nouveauCommentaire', nouveauCommentaire)

    this.commentaireService.addCommentaire(nouveauCommentaire).subscribe(
      (response) => {
        idComm = response;
        if (response) {
          this.commentaireService.affecterCommentAPub(idComm['idCom'], publicationId).subscribe(
            (response) => {
              this.newCommentForm.reset();
              // Rafraîchissez l'affichage des publications pour refléter les changements
              this.getAllPublications();
            },
            (error) => {
              console.error('Erreur lors de l\'ajout du commentaire :', error);
            }
          );
        }
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du commentaire :', error);
      }
    );
}


openEditComment(commentaire: any) {
  this.idCommentForEdit = commentaire.idCom
  this.newCommentFormEdit.patchValue({
    contenuCom: commentaire.contenuCom,
    dateCom: commentaire.dateCom,
  });
}


openDeleteComment(commentaire: any) {
  this.commentaireService.deleteCommentaire(commentaire.idCom).subscribe((response) => {
    this.getAllPublications()

  })

}

  editComment() {
    if (this.newCommentFormEdit.valid) {
      console.log(this.newCommentFormEdit.value)
      let bodyComment = this.newCommentFormEdit.value
      bodyComment.dateCom = this.getCurrentDate()
      this.commentaireService.modifyCommentaire(this.idCommentForEdit, bodyComment).subscribe((response) => {
        if (response) {
          const updateModal = document.getElementById('editCommentModal');
          if (updateModal) {
            updateModal.classList.remove('show');
            document.body.classList.remove('modal');
          }
        }

        this.getAllPublications()

      })
    }
  }
  


  setPage(page: number) {
    // Calculate starting index and ending index for pagination
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.publications.length - 1);
    // Slice the array to get the current page of publications
    this.pagedPublications = this.publications.slice(startIndex, endIndex + 1);
    // Update current page
    this.currentPage = page;
  }

 
  // Méthode pour changer de page
pageChanged(page: number) {
  this.currentPage = page;
  this.setPage(page);
  // Mettre à jour les paramètres de la requête dans l'URL
  this.router.navigate([], {
    relativeTo: this.route,
    queryParams: { page: page },
    queryParamsHandling: 'merge', // Conservez les autres paramètres de la requête
  });
}


  formatDate(date: any) {
    const isoDate: Date = new Date(date);
    const formattedDate: string = isoDate.toISOString().split('T')[0];
    /*console.log(formattedDate);*/
    return formattedDate
  }

  openAddCommentModal(publicationId: any) {
    const publicationToUpdate = this.publications.find((pub: Publication) => pub.idPub === publicationId);
    this.selectedComment = publicationToUpdate;

  }


  getPublicationsOrderedByDate() {
    this.publicationService.getPublicationsOrderedByDate().subscribe(
      (res) => {
        this.publications = res;
        this.setPage(1); // Mettre à jour la pagination après le tri
      },
      (error) => {
        console.error('Erreur lors du tri des publications par date :', error);
      }
    );
  }
  
  getPublicationsOrderedByPopularity() {
    this.publicationService.getPublicationsOrderedByPopularity().subscribe(
      (res) => {
        this.publications = res;
        this.setPage(1); // Mettre à jour la pagination après le tri
      },
      (error) => {
        console.error('Erreur lors du tri des publications par popularité :', error);
      }
    );
  }
  

  getPublicationsOrderedByNumberOfResponses() {
    const currentPage = this.currentPage; // Sauvegarder la page actuelle
    this.publicationService.getPublicationsOrderedByNumberOfResponses().subscribe(
      (res) => {
        this.publications = res;
        this.setPage(1); // Mettre à jour la pagination en fonction de la page actuelle
      },
      (error) => {
        console.error('Erreur lors du tri des publications par nombre de réponses :', error);
      }
    );
  }
  

  toggleButtons(option: string): void {
    if (option === 'all') {
      this.showOtherButtons = !this.showOtherButtons;
    }
  }

  

  searchPublications(): void {
    if (this.searchTerm.trim() !== '') {
      // Appeler le service pour effectuer la recherche par sujet
      this.publicationService.searchPublicationsBySujet(this.searchTerm).subscribe(publications => {
        this.publications = publications;
      });
    } else {
      // Si le terme de recherche est vide, récupérez toutes les publications normalement
      this.getAllPublications();
    }
    // Naviguer vers la page des publications après avoir terminé la recherche
    this.navigateToPublicationsPage();
  }

  navigateToPublicationsPage(): void {
    this.router.navigate(['/publications']);
  }


}