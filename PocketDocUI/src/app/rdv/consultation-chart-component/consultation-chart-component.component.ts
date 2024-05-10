import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-consultation-chart-component-component',
  templateUrl: './consultation-chart-component.component.html',
  styleUrls: ['./consultation-chart-component.component.css']
})
export class ConsultationChartComponentComponent implements OnInit {

 
public options: any;

constructor(private http: HttpClient) { }

ngOnInit() {
  this.http.get<any>('http://localhost:8089/rendezVous/countByDoctor').subscribe(data => {
    this.options = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Statistiques des consultations par médecin'
      },
      xAxis: {
        categories: Object.keys(data)
      },
      yAxis: {
        title: {
          text: 'Nombre de consultations'
        }
      },
      series: [{
        name: 'Médecin',
        data: Object.values(data)
      }]
    };
    Highcharts.chart('container', this.options);
  });
}

}

