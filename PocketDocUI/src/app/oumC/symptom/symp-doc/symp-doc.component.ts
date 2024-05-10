import { Component, OnInit } from '@angular/core';
import { SymptomService } from '../../service/symptom.service';
import { Symptom } from '../../entities/Symptom';
import { JwtService } from 'src/app/auth/service/jwt.service';

@Component({
  selector: 'app-symp-doc',
  templateUrl: './symp-doc.component.html',
  styleUrls: ['./symp-doc.component.css']
})
export class SympDocComponent implements OnInit {
  symptomData!: any[][];


  userId!: number ;

  constructor(private symptomService: SymptomService,private jwtService:JwtService) {}

  ngOnInit(): void {
    
      const userId = this.jwtService.getUserId();
      if (!isNaN(userId)) {
        this.userId = userId;
        this.loadSymptomsByUserId(this.userId);
        
      }
    }

  loadSymptomsByUserId(userId: number): void {
    this.symptomService.findSymptomByUserId(userId).subscribe(
      (data: any[]) => {
        this.symptomData = data.map(item => [
          item[0], // Première partie de l'élément : tableau de symptômes
          item[1]  // Deuxième partie de l'élément : nom d'utilisateur
        ]);
      }
    );
  }
  
  
  
}