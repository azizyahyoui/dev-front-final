import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/service/event.service';
import { InscriptionService } from 'src/app/service/inscription.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import { ListInscriByuserComponent } from '../list-inscri-byuser/list-inscri-byuser.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MapViewComponent } from 'src/app/FrontOffice/Event/map-view/map-view.component';
import { FormDataService } from 'src/app/service/form-data.service';
import { JwtService } from 'src/app/auth/service/jwt.service';

@Component({
  selector: 'app-list-event-front',
  templateUrl: './list-event-front.component.html',
  styleUrls: ['./list-event-front.component.css']
})

export class ListEventFrontComponent {

  events: any[] = [];
  descriptionLimit = 45; // Limite de caractères pour la description
  showFullDescription: {[key: number]: boolean} = {}; // Dictionnaire pour suivre l'état de l'affichage complet de la description
  errorMessage: string = ''; // Variable pour stocker le message d'erreur
  inscriptions: any;
  eventsInscr:any;

  // Variables de pagination
  currentPage: number = 1;
  pageSize: number = 6; 
  totalItems: number = 0;
  searchTerm: string = ''; // Propriété pour stocker le terme de recherche
  selectedCategory: string = ''; // Propriété pour stocker la catégorie de filtrage

  searchDate: string = ''; // Propriété pour stocker la date de recherche  

  inscr = {
    event_id: '',
    user_id: '',
  };

  constructor(
    private shared: EventService,
    private router:Router,
    private service:InscriptionService,
    public dialog: MatDialog,
    private formDataService: FormDataService,
    private jwtService: JwtService
    ) {}

  
  ngOnInit(): void {
    this.loadEvents(); 
  }


  loadEvents() {
    this.shared.getEventNonInscri(this.jwtService.getUserId())
      .subscribe(
        res => {
          console.log(res);
          this.events = res;
          this.totalItems = this.events.length; // Mettre à jour le nombre total d'éléments
        },
        err => {
          console.log(err);
        }
      );
  }

  getCurrentPageEvents(): any[] {
    let filteredEvents = this.events; // Commencez par tous les événements
    if (this.searchTerm && this.selectedCategory) {
      // Si un terme de recherche et une catégorie sont définis, filtrer les événements en conséquence
      filteredEvents = this.events.filter((event: any) => {
        const fieldValue = event[this.selectedCategory];
        if (typeof fieldValue === 'string') {
          return fieldValue.toLowerCase().includes(this.searchTerm.toLowerCase());
        } else if (typeof fieldValue === 'number') {
          // Convertir le terme de recherche en nombre et comparer avec la valeur du champ
          return fieldValue === parseInt(this.searchTerm);
        }
        // Gérer d'autres types de données ici si nécessaire
        return false; // Retourner false par défaut si le champ n'est pas de type pris en charge
      });
    }
    // Appliquer la pagination aux événements filtrés
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return filteredEvents.slice(startIndex, endIndex);
  }
  
  

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }
  
    // Fonction pour gérer le changement de page
    onPageChange(page: number) {
      this.currentPage = page;
    }
  

  saveIdLocalStorage(){
    localStorage.setItem('Id','2')
  }

  getIdLocalStorage(){
    localStorage.getItem('id');
    console.log(localStorage.getItem('id'));
  }

  showFullDetails: {[key: number]: boolean} = {}; // Dictionnaire pour suivre l'état d'affichage des détails de chaque événement


  toggleDescription(item: any) {
    this.showFullDetails[item.id] = !this.showFullDetails[item.id];
  }

  registerEvent(eventId: number) {
    console.log('ID de l\'événement à enregistrer:', eventId);
    // Récupérer la valeur du localStorage
    const userId = this.jwtService.getUserId()
    
    // Mettre à jour l'objet inscr
    this.inscr = {
      event_id: eventId.toString(), // Convertir eventId en chaîne de caractères si nécessaire
      user_id: userId.toString() // Assurez-vous que userId existe avant de l'utiliser
    };

    console.log(eventId, userId);

    // Créer un objet FormData pour envoyer à la fois l'image et les données d'inscription
    const formData = new FormData();
    formData.append('inscription', JSON.stringify(this.inscr)); // Ajouter les données d'inscription
    this.formDataService.getFormData().subscribe(imageFormData => {
      if (imageFormData && imageFormData.get('image')) { // Vérifier si imageFormData et imageFormData.get('image') ne sont pas null
        const imageBlob = imageFormData.get('image') as Blob; // Convertir en Blob
        formData.append('image', imageBlob, 'image.png'); // Ajouter l'image
        // Envoyer formData au backend
        this.service.ajouterInscriWithMap(formData).subscribe(
          response => {
            this.loadEvents();
            console.log('Image et inscription envoyées avec succès:', response);
          },
          error => {
            console.error('Erreur lors de l\'envoi de l\'image et de l\'inscription:', error);
          }
        );
      }
      else {
        this.service.ajouterInscr(this.inscr,).subscribe(
          res => {
            console.log(res)
            this.loadEvents();
          },
          err => {
            alert("no place available")
            console.log(err);  
            this.errorMessage = err; // Afficher le message d'erreur dans votre template HTML  
          }
        );
            }
    });
}


/*
  registerEvent(eventId: number) {
    console.log('ID de l\'événement à enregistrer:', eventId);
    // Récupérer la valeur du localStorage
    const userId = localStorage.getItem('id');
    
    // Mettre à jour l'objet inscr
    this.inscr = {
      event_id: eventId.toString(), // Convertir eventId en chaîne de caractères si nécessaire
      //event_id: '1',
      user_id: userId ? userId : '' // Assurez-vous que userId existe avant de l'utiliser
      //user_id: '1'
    };

    console.log(eventId,userId)
    
    // Appel au service d'inscription avec l'objet inscr mis à jour
    this.service.ajouterInscr(this.inscr,).subscribe(
      res => {
        console.log(res)
        this.loadEvents();
      },
      err => {
        alert("l'utilisateur est déjà inscrit à cet événement.")
        console.log(err);  
        this.errorMessage = err; // Afficher le message d'erreur dans votre template HTML  
      }
    );
    this.formDataService.getFormData().subscribe(formData => {
      if (formData) {
        console.log(formData)
        this.service.ajouterInscr2(formData).subscribe(
          response => {
            console.log('Image sent successfully:', response);
          },
          error => {
            console.error('Error sending image:', error);
          }
        );      }
    });

  }
*/
  getAllInscriByUserId(){
    const userId = this.jwtService.getUserId();
    this.service.getAllInscriByUserID(userId).subscribe(
      res => {
        this.eventsInscr = res;
       // this.openPopup();
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }


  openMapPopup(x: number, y: number): void {
    const dialogRef = this.dialog.open(MapViewComponent, {
      width: '500px', // ajustez la largeur selon vos besoins
      data: { x, y }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openInscriUserPopup(): void {
    const dialogRef = this.dialog.open(ListInscriByuserComponent, {
      width: '500px', // ajustez la largeur selon vos besoins
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openInscriUser():void {
    this.router.navigate(['/listInscri'])
  }

  searchEvents() {
    if (this.searchTerm && this.selectedCategory) {
      if (this.selectedCategory === 'date') {
        // Filtrer les événements en fonction de la date de recherche
        this.events = this.events.filter((event: any) => {
          // Supposons que la date est stockée dans un champ 'date' de type string
          return event.date.toLowerCase().includes(this.searchTerm.toLowerCase());
        });
      } else {
        // Filtrer les événements en fonction du terme de recherche et de la catégorie choisie
        this.events = this.events.filter((event: any) => {
          const fieldValue = event[this.selectedCategory];
          if (typeof fieldValue === 'string') {
            return fieldValue.toLowerCase().includes(this.searchTerm.toLowerCase());
          } else if (typeof fieldValue === 'number') {
            return fieldValue === parseInt(this.searchTerm);
          } else {
            return false;
          }
        });
      }
      this.totalItems = this.events.length;
      this.currentPage = 1;
    } else {
      this.loadEvents();
    }
  }
  
  
}