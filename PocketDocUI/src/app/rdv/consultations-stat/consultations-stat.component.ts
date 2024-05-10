
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-consultations-stat',
  templateUrl: './consultations-stat.component.html',
  styleUrls: ['./consultations-stat.component.css']
})
export class ConsultationsStatComponent {


  public options: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>('http://localhost:8089/rendezVous/consultationsByMonth').subscribe(data => {
      this.options = {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Statistiques des consultations par mois'
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
          name: 'Mois',
          data: Object.values(data)
        }]
      };
      Highcharts.chart('container', this.options);
    });
  }

}
