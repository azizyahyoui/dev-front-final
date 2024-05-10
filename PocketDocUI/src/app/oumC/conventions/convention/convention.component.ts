import { Component, OnInit } from '@angular/core';
import { ConventionService } from '../../service/convention.service';
import { ActivatedRoute } from '@angular/router';
import { style } from '@angular/animations';
import { JwtService } from 'src/app/auth/service/jwt.service';

@Component({
  selector: 'app-convention',
  templateUrl: './convention.component.html',
  styleUrls: ['./convention.component.css']
})
export class ConventionComponent implements OnInit {

  userId: number =0; // Initialisez avec null

  constructor(private conventionService: ConventionService, private route: ActivatedRoute,private jwtService:JwtService) { }

  ngOnInit(): void {
    
        this.userId = this.jwtService.getUserId();
        console.log(this.userId);
        // Affectez l'ID récupéré à la propriété userId
        // Appeler la méthode pour exporter la convention avec l'ID récupéré
        
      }
    

  exportConventionPdf(userId: number) {
    this.conventionService.exportPdf(userId).subscribe(
      blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'convention.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Erreur lors de la récupération du fichier PDF :', error);
      }
    );
  }

  zoomIn() {
    const cardImgTop = document.querySelector('.card-img-top') as HTMLElement;
    if (cardImgTop) {
      cardImgTop.style.transform = 'scale(1.1)';
    }
  }
  
  zoomOut() {
    const cardImgTop = document.querySelector('.card-img-top') as HTMLElement;
    if (cardImgTop) {
      cardImgTop.style.transform = 'scale(1)';
    }
  }
  
  
  
}
