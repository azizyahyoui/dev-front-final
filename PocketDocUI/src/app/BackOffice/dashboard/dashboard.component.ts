import { NgApexchartsModule } from 'ng-apexcharts';
import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../../reclamation.service';
import * as Highcharts from 'highcharts'; // Import Highcharts
import { Reclamation } from 'src/app/module/Reclamation';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router
import { JwtService } from 'src/app/auth/service/jwt.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import {DashboardService} from "../../Services/dashboard.service";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private reclamationService: ReclamationService,
    private dashboardService: DashboardService,
    private http: HttpClient
  ) {}
  reclamations: Reclamation[] = [];
  totalClaims: number = 0;
  error: string = '';
  public options: any;
  balance_overviewChart: any;
  areasplineChart: any;
  statis_data: any;



  ngOnInit() {
    this._areasplineChart('["--tb-primary", "--tb-secondary"]')
    this.reclamationService.calculateWeeklyReclamations().subscribe(
      (data) => {
        this.renderChart(data);
      },
      (error) => {
        console.error('Error fetching weekly reclamations:', error);
      }
    );
    this.loadReclamations();
    
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
      Highcharts.chart('c', this.options);
    });

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
      Highcharts.chart('co', this.options);
    });
  }

  loadReclamations(): void {
    this.reclamationService.getAllReclamations().subscribe(
      (reclamations: Reclamation[]) => {
        this.reclamations = reclamations;
        this.calculateTotalClaims();
        this.error = ''; // error message if request succeeds
      },
      (error: any) => {
        if (error.status === 0) {
          this.error =
            'Failed to connect to the server. Please check your internet connection or try again later.';
        } else {
          this.error = `Error loading reclamations: ${error.status} - ${error.statusText}`;
        }
      }
    );
  }

  calculateTotalClaims(): void {
    this.totalClaims = this.reclamations.length;
  }
  renderChart(data: any) {
    const weeks = Object.keys(data);
    const reclamationCounts = Object.values(data);

    Highcharts.chart('lineChart', {
      chart: {
        type: 'line',
      },
      title: {
        text: 'Weekly Reclamation Statistics',
      },
      xAxis: {
        categories: weeks,
      },
      yAxis: {
        title: {
          text: 'Number of Reclamations',
        },
      },
      series: [
        {
          name: 'Weekly Reclamations',
          data: reclamationCounts,
        },
      ],
    } as Highcharts.Options); // Specify the type of options as Highcharts.Options
  }
  async _areasplineChart(colors: any) {
    const response = await this.dashboardService.getAllPubMensuel();
    console.log(response);
    const valuesArray = Object.values(response); // Extract values into an array
    const keysArray = Object.keys(response); // Extract keys into an array

    // colors = this.getChartColorsArray(colors);
    colors = ['#3F51B5', '#9E9E9E'];

    this.areasplineChart = {
      series: [{
        name: 'This Month',
        data: valuesArray
      }],
      chart: {
        height: 320,
        type: 'area',
        toolbar: {
          show: false
        }
      },
      fill: {
        type: ['gradient', 'gradient'],
        gradient: {
          shadeIntensity: 1,
          type: "vertical",
          inverseColors: false,
          opacityFrom: 0.2,
          opacityTo: 0.0,
          stops: [50, 70, 100, 100]
        },
      },
      markers: {
        size: 4,
        strokeColors: colors,
        strokeWidth: 1,
        strokeOpacity: 0.9,
        fillOpacity: 1,
        hover: {
          size: 6,
        }
      },
      grid: {
        show: false,
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: keysArray,
        labels: {
          rotate: -90
        },
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          stroke: {
            width: 1
          },
        },
      },
      stroke: {
        width: [2, 2],
        curve: 'smooth'
      },
      colors: colors,
    }

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._areasplineChart('["--tb-primary", "--tb-secondary"]')
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
    // observer.disconnect();
  }

  

  getChartColorsArray(colors: any) {
    colors = JSON.parse(colors);
    return colors.map(function (value: any) {
      var newValue = value.replace(" ", "");
      if (newValue.indexOf(",") === -1) {
        var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
        if (color) {
          color = color.replace(" ", "");
          return color;
        }
        else return newValue;;
      } else {
        var val = value.split(',');
        if (val.length == 2) {
          var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
          rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
          return rgbaColor;
        } else {
          return newValue;
        }
      }
    });
  }
}
