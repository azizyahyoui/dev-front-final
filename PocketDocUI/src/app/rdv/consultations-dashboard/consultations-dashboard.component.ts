import { Component, OnInit } from '@angular/core';
import { ConsultationChartComponentComponent } from '../consultation-chart-component/consultation-chart-component.component';
import { ConsultationsStatComponent } from '../consultations-stat/consultations-stat.component';
@Component({
  selector: 'app-consultations-dashboard',
  templateUrl: './consultations-dashboard.component.html',
  styleUrls: ['./consultations-dashboard.component.css']
})
export class ConsultationsDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
