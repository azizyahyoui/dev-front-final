import { AfterViewInit, Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { StatService } from '../service/stat.service';
import { ConventionService } from '../service/convention.service';


Chart.register(...registerables);
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements AfterViewInit {
  ficheData: any; 
  symptomData: any;

  constructor(private yourService: StatService, private conventionService: ConventionService) { }

  ngAfterViewInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.yourService.getFichePercentageByTypeAddiction().subscribe(data => {
      this.ficheData = data;
      this.renderFicheChart();
    });

    this.yourService.getSymptomPercentageByIntensity().subscribe(data => {
      this.symptomData = data;
      this.renderSymptomChart();
    });
  }

  renderFicheChart(): void {
    const ctx = document.getElementById('ficheChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(this.ficheData),
        datasets: [{
          label: 'Pourcentage des addictions',
          data: Object.values(this.ficheData),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Types d\'addiction'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Pourcentage (%)'
            }
          }
        }
      }
    });
  }

  renderSymptomChart(): void {
    const ctx = document.getElementById('symptomChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(this.symptomData),
        datasets: [{
          label: 'Pourcentage des symptômes',
          data: Object.values(this.symptomData),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Intensité des symptômes'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Pourcentage (%)'
            }
          }
        }
      }
    });
  }
  exportExcel(): void {
    this.conventionService.exportExcel().subscribe(
      (response: Blob) => {
        const filename = 'conventions.xlsx';
        const url = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        // Nettoyage de l'URL
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Erreur lors du téléchargement du fichier Excel : ', error);
      }
    );
  }
  
  
}


