import { Component, OnInit } from '@angular/core';
//import { CalendarView } from 'angular-calendar';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { HttpClient } from '@angular/common/http';
import interactionPlugin from '@fullcalendar/interaction';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { JwtService } from 'src/app/auth/service/jwt.service';


@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})

export class CalenderComponent implements OnInit  {
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week;
  id:any;
  
date : any;
newFormattedDate:any;
  constructor(private http: HttpClient,private activatedRoute: ActivatedRoute,private jwtService: JwtService) {}

  calendarOptions: CalendarOptions = {
    eventClick: function(info) {
      alert('Event: ' + info.event.title);
      alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
      alert('View: ' + info.view.type);
  
      // change the border color just for fun
      info.el.style.borderColor = 'red';
    },
    plugins: [timeGridPlugin,interactionPlugin, dayGridPlugin ],
    initialView: 'timeGridWeek',
    selectable: true,
    slotMinTime: '08:00:00', // Heure de début
    slotMaxTime: '17:00:00', // Heure de fin
    slotDuration: '00:15:00', // Intervalle de 15 minutes
    weekends: false,
    events: [], eventColor: '#3788d8', // Couleur par défaut pour tous les événements
    timeZone: 'Africa/Tunis',
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false // Format de l'heure en 24 heures

    }, dateClick: this.handleDateClick.bind(this) // Lier le contexte du composant à la méthode
 
  
  };
  handleDateClick(arg:any) {
    console.log('Date cliquée :', arg.dateStr);
    this.date=arg.dateStr;
   
  console.log("date",this.date);
 

  // Formatage de la date
  const formattedDate = new Date(arg.dateStr).toISOString().slice(0, 16).replace('T', ' ');
  console.log("Date formatée :", formattedDate);
    // Vous pouvez maintenant faire ce que vous voulez avec la date cliquée
  }

  ngOnInit() {
    // Récupérer les rendez-vous depuis l'API
    this.getRendezVous();
    console.log(this.jwtService.getUserId());
  }

  getRendezVous() {
    let idDoctor = this.activatedRoute.snapshot.params['id']; // Remplacez 123 par l'ID du patient correspondant
    this.http.get<any[]>(`http://localhost:8089/rendezVous/all/rdvDoctor/${idDoctor}`).subscribe(
      (rendezVous: any[]) => {
        // Mapper les rendez-vous pour les rendre compatibles avec FullCalendar
       /* const events = rendezVous.map(rendezVousItem => ({
          title: 'Reserved',
          start: new Date(rendezVousItem.date), // Assurez-vous que la date est au format Date
          end: new Date(rendezVousItem.date+30), // Assurez-vous que la date est au format Date
          // Vous pouvez également inclure d'autres propriétés des rendez-vous si nécessaire
        }));*/
        const events = rendezVous.map(rendezVousItem => ({
          title: 'Reserved',
         // start: new Date(rendezVousItem.date), // Date de début
         // end: new Date(new Date(rendezVousItem.date)), // Date de fin (date de début + 30 minutes)
         start: new Date(rendezVousItem.date[0], rendezVousItem.date[1] - 1, rendezVousItem.date[2], rendezVousItem.date[3], rendezVousItem.date[4]), // Date de début
         end: new Date(rendezVousItem.date[0], rendezVousItem.date[1] - 1, rendezVousItem.date[2], rendezVousItem.date[3], rendezVousItem.date[4] + 30), // Date de fin
    
        }));
        

        // Mettre à jour les événements dans les options du calendrier
        this.calendarOptions.events = events;
        console.log('Rendez-vous récupérés avec succès:', events);
      },
      error => {
        console.error('Erreur lors de la récupération des rendez-vous:', error);
      }
    );
  }
  
  ajouterRendezVous() {
    this.id = this.jwtService.getUserId();
  // const id = localStorage.getItem('id');

   const formattedDate = new Date(this.date).toISOString().slice(0, 16);

   let idDoctor = this.activatedRoute.snapshot.params['id'];
   const rendezVous = {
     date:formattedDate ,// Date sélectionnée à partir du calendrier
     patient: { id: this.id }, // ID du patient fixe
     doctor: { id: idDoctor } // ID du médecin sélectionné
    
   };

    this.http.post<any>('http://localhost:8089/rendezVous/add-rendezvous', rendezVous).subscribe(
     
      
    (data) => { 
      if (data) {
        console.log('Rendez-vous ajouté avec succès.');
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Rendez-vous ajouté avec succès",
          customClass: {
              popup: 'swal2-popup-center'
          },
          confirmButtonColor: '#28a745', // Couleur verte pour le bouton "OK"
          timer: 3000 // Durée d'affichage de l'alerte en millisecondes (ici 3 secondes)
      });
      }
    },
    (error) => {
      console.error('Erreur lors de la requête HTTP :', error);
      Swal.fire({
        position: "top-end",
        title: 'opps ..',
        text: 'Erreur serveur',
        icon: 'error'
      });
    }
  );
  
  }
  

}
//const date = eventDropInfo.dateStr;
enum CalendarView {
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year'
}
