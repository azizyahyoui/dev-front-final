import { Component,ViewChild  } from '@angular/core';
import { PublicationService } from 'src/app/Services/publication.service';
import { PageEvent } from '@angular/material/paginator';
import {CommentaireService} from "../../Services/commentaire.service"; // Import de PageEvent
import {PaginatePipe} from "ngx-pagination";
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent {

  searchTerm: string = '';

  publications: any = [];
  showOtherButtons: boolean = false; // Ajout de la variable showOtherButtons
  
 /*pagedPublications: any[] = [];
  currentPage = 1;
  pageSize = 5;*/

  constructor(private publicationService: PublicationService,private commentaireService: CommentaireService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit() {
    // Récupérer le numéro de page à partir des paramètres de la requête dans l'URL
  this.route.queryParams.subscribe(params => {
    this.currentPage = params['page'] || 1;
    // Charger les publications en fonction de la page actuelle
    this.getAllPublications();
  });
  }

  /*getAllPublications() {
    this.publicationService.getAllPublications().subscribe(res => {
      this.publications = res;
    })
  }*/

  /* getAllPublications() {
     this.publicationService.getAllPublications().subscribe(
       (res) => {
         this.publications = res;
         this.totalItems = this.publications.length; // Mettre à jour le nombre total d'éléments
       },
       (error) => {
         console.error('Erreur lors de la récupération des publications :', error);
       }
     );
   }*/

  getAllPublications() {
    const currentPage = this.currentPage;
    this.publicationService.getAllPublications().subscribe(
      (res) => {
        this.publications = res;
        console.log('puuuub', this.publications)
      },
      (error) => {
        console.error('Erreur lors de la récupération des publications :', error);
      }
    );
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

  formatDate(date: any): string {
    const formattedDate = new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    return formattedDate;
  }


  openDeleteComment(commentaire: any) {
    this.commentaireService.deleteCommentaire(commentaire.idCom).subscribe((response) => {
      this.getAllPublications()

    })

  }

 /*setPage(page: number) {
    // Calculate starting index and ending index for pagination
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.publications.length - 1);
    // Slice the array to get the current page of publications
    this.pagedPublications = this.publications.slice(startIndex, endIndex + 1);
    // Update current page
    this.currentPage = page;
  }

  /*pageChanged(page: number) {
    this.setPage(page);
  }*/

  /*pageChanged(page: number) {
  this.currentPage = page;
  this.setPage(page);
  
  // Mettre à jour les paramètres de la requête dans l'URL
  this.router.navigate([], {
    relativeTo: this.route,
    queryParams: { page: page },
    queryParamsHandling: 'merge', // Conservez les autres paramètres de la requête
  });
}

  formatDates(date: any) {
    const isoDate: Date = new Date(date);
    const formattedDate: string = isoDate.toISOString().split('T')[0];
    console.log(formattedDate);
    return formattedDate

  }*/

  pagedPublications: any[] = [];
  currentPage = 1;
  pageSize = 1;

  setPage(page: number) {
    // Calculate starting index and ending index for pagination
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.publications.length - 1);
    // Slice the array to get the current page of publications
    this.pagedPublications = this.publications.slice(startIndex, endIndex + 1);
    // Update current page
    this.currentPage = page;
  }

  pageChanged(page: number) {
    this.setPage(page);
  }

  formatDates(date: any) {
    const isoDate: Date = new Date(date);
    const formattedDate: string = isoDate.toISOString().split('T')[0];
    return formattedDate

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
    this.router.navigate(['/admin/allpublication']);
  }


}
