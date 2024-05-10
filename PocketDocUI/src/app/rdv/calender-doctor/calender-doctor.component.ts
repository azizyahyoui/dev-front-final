import { Component, OnInit } from '@angular/core';
//import { CalendarView } from 'angular-calendar';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { HttpClient } from '@angular/common/http';
import interactionPlugin from '@fullcalendar/interaction';
import { ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/auth/service/jwt.service';

@Component({
  selector: 'app-calender-doctor',
  templateUrl: './calender-doctor.component.html',
  styleUrls: ['./calender-doctor.component.css'],
})
export class CalenderDoctorComponent implements OnInit {
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week;
  date: any;
  id!: number;
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private jwtService: JwtService
  ) {}

  calendarOptions: CalendarOptions = {
    eventClick: function (info) {
      alert('Event: ' + info.event.title);
      alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
      alert('View: ' + info.view.type);

      // change the border color just for fun
      info.el.style.borderColor = 'red';
    },
    plugins: [timeGridPlugin, interactionPlugin, dayGridPlugin],
    initialView: 'timeGridWeek',
    selectable: true,
    slotMinTime: '08:00:00', // Heure de début
    slotMaxTime: '17:00:00', // Heure de fin
    slotDuration: '00:15:00', // Intervalle de 15 minutes
    weekends: false,
    events: [],
    eventColor: '#3788d8', // Couleur par défaut pour tous les événements
    timeZone: 'Africa/Tunis',
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false, // Format de l'heure en 24 heures
    },
    dateClick: this.handleDateClick.bind(this), // Lier le contexte du composant à la méthode
  };
  handleDateClick(arg: any) {
    // Récupérer la date cliquée au format string
    const clickedDateStr: string = arg.dateStr;
    console.log(arg);

    // Convertir la date cliquée en objet Date
    const clickedDate: Date = new Date(clickedDateStr);
    console.log(clickedDate);
    console.log(arg);

    // Ajouter deux heures à la date cliquée
    // clickedDate.setHours(clickedDate.getHours() + 2); // Ajoute deux heures

    // Obtenir le décalage horaire actuel de la date (en minutes)
    //const offset: number = clickedDate.getTimezoneOffset();

    // Ajouter le décalage horaire à la date pour tenir compte du fuseau horaire local
    // clickedDate.setMinutes(clickedDate.getMinutes() + offset);

    // Formater la nouvelle date avec deux heures ajoutées
    const newFormattedDate: string = clickedDate
      .toISOString()
      .slice(0, 16)
      .replace('T', ' ');
    /* const year = clickedDate.getFullYear();
    const month = ('0' + (clickedDate.getMonth() + 1)).slice(-2); // Ajoute un zéro en tête si nécessaire
    const day = ('0' + clickedDate.getDate()).slice(-2); // Ajoute un zéro en tête si nécessaire
    const hours = ('0' + (clickedDate.getHours() )).slice(-2); // Ajoute 2 heures et ajoute un zéro en tête si nécessaire
    const minutes = ('0' + clickedDate.getMinutes()).slice(-2); // Ajoute un zéro en tête si nécessaire
    
    const newFormattedDate: string = `${year}-${month}-${day} ${hours}:${minutes}`;
     console.log(this.jwtService.getUserId());*/

    // Afficher la nouvelle date formatée
    console.log(
      'Nouvelle date avec deux heures ajoutées et ajustement du fuseau horaire:',
      newFormattedDate
    );

    // Vous pouvez maintenant utiliser newFormattedDate pour effectuer d'autres opérations si nécessaire
  }

  ngOnInit() {
    // Récupérer les rendez-vous depuis l'API
    this.getRendezVous();
  }

  getRendezVous() {
    // let id = localStorage.getItem('id');
    this.id = this.jwtService.getUserId();
    this.http
      .get<any[]>(`http://localhost:8089/rendezVous/all/rdvDoctor/${this.id}`)
      .subscribe(
        (rendezVous: any[]) => {
          const events = rendezVous.map((rendezVousItem) => ({
            title: 'Reserved',
            // start: new Date(rendezVousItem.date), // Date de début
            // end: new Date(new Date(rendezVousItem.date)), // Date de fin (date de début + 30 minutes)
            start: new Date(
              rendezVousItem.date[0],
              rendezVousItem.date[1] - 1,
              rendezVousItem.date[2],
              rendezVousItem.date[3],
              rendezVousItem.date[4]
            ), // Date de début
            end: new Date(
              rendezVousItem.date[0],
              rendezVousItem.date[1] - 1,
              rendezVousItem.date[2],
              rendezVousItem.date[3],
              rendezVousItem.date[4] + 30
            ), // Date de fin
          }));

          // Mettre à jour les événements dans les options du calendrier
          this.calendarOptions.events = events;
          console.log('Rendez-vous récupérés avec succès:', events);
        },
        (error) => {
          console.error(
            'Erreur lors de la récupération des rendez-vous:',
            error
          );
        }
      );
  } /*
  getRendezVous() {
    this.id = this.jwtService.getUserId();
    this.http.get<any[]>(`http://localhost:8089/rendezVous/all/rdvDoctor/${this.id}`).subscribe(
      (rendezVous: any[]) => {
        const events = rendezVous.map(rendezVousItem => ({
          title: 'Reserved',
          start: this.adjustToTunisianTime(new Date(rendezVousItem.date)),
          end: this.adjustToTunisianTime(new Date(rendezVousItem.dateEnd)),
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

  adjustToTunisianTime(date: Date): Date {
    // Ajuster les heures en ajoutant une heure pour passer de GMT+0200 à GMT+0100
    date.setHours(date.getHours() - 1);
    return date;
  }

  
  // Méthode pour convertir une date en UTC vers le fuseau horaire local
  convertToLocaleDate(date: Date): Date {
    const offset = date.getTimezoneOffset();
    return new Date(date.getTime() - (offset * 60 * 1000));
  }*/
}
//const date = eventDropInfo.dateStr;
enum CalendarView {
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year',
}
