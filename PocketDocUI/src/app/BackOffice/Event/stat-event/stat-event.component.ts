import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/service/event.service';
import * as Highcharts from 'highcharts';

// Définir une interface pour le type des éléments de eventStats
interface EventStatsItem {
  id: number;
  title: string;
  nbInscris: number;
}

@Component({
  selector: 'app-stat-event',
  templateUrl: './stat-event.component.html',
  styleUrls: ['./stat-event.component.css']
})
export class StatEventComponent implements OnInit {

  eventStats: EventStatsItem[] = []; // Initialiser eventStats à un tableau vide
  averageInscriptions: any;
  events: any[] = [];
  eventsModified: any[] = [];

  startDate: string = ''; 
  endDate: string = '';

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.fetchEventStats();
    this.fetchAverageInscriptions();
  }

  fetchEventStats(): void {
    this.eventService.getEventStats().subscribe(data => {
      this.eventStats = data;
      // Call renderChart here to ensure data is available before rendering
      this.renderChart();
    });
  }

  fetchAverageInscriptions(): void {
    this.eventService.getAverageInscriptions().subscribe(
      average => {
        this.averageInscriptions = average;
      },
      error => {
        console.error('Error fetching average inscriptions:', error);
      }
    );
  }

  renderChart(): void {
    // Check if eventStats is defined and not empty
    if (this.eventStats && this.eventStats.length > 0) {
      Highcharts.chart('container', {
        chart: {
          type: 'bar'
        },
        title: {
          text: 'Number of registrations per event'
        },
        xAxis: {
          categories: this.eventStats.map(item => item.title)
        },
        yAxis: {
          title: {
            text: 'Number of registrations'
          }
        },
        series: [{
          name: 'Number of registrations',
          data: this.eventStats.map(item => item.nbInscris)
        }]
      } as Highcharts.Options); // Cast l'objet comme Highcharts.Options
    }
  }

  showModifiedEvents(): void {
    this.eventService.getEventModified().subscribe(
      res => {
        this.eventsModified = res;
        console.log(res);
      },
      error => {
        console.error('Error fetching modified events:', error);
      }
    );
  }

  hideModifiedEvents(): void {
    this.eventsModified = []; 
  }


  fetchEvents(): void {
    this.eventService.findEventBetweenDate(this.startDate, this.endDate)
      .subscribe(events => this.events = events);
  }

  cancelDisplay(): void {
    this.events = []; 
  }
  
}
