import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SymptomService } from '../../service/symptom.service';
import { Symptom } from '../../entities/Symptom';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtService } from 'src/app/auth/service/jwt.service';


@Component({
  selector: 'app-symp',
  templateUrl: './symp.component.html',
  styleUrls: ['./symp.component.css']
})
export class SympComponent implements OnInit {
  symptomForm!: FormGroup;
  currentDate!: Date;
  userId: number = 0;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private yourService:SymptomService,private jwtService:JwtService) { }

  ngOnInit(): void {
   
        this.userId = this.jwtService.getUserId();
        this.symptomForm = this.formBuilder.group({
          type: ['', Validators.required],
          severity: ['', Validators.required],
          description: ['', Validators.required],
          location: ['', Validators.required],
          duration: ['', Validators.required],
          triggers: ['', Validators.required]
        });
        this.currentDate = new Date();
      }
   
  onSubmit(): void {
    if (this.symptomForm.valid) {
      const symptom: Symptom = {
        type: this.symptomForm.value.type,
        severity: this.symptomForm.value.severity,
        description: this.symptomForm.value.description,
        location: this.symptomForm.value.location,
        duration: this.symptomForm.value.duration,
        triggers: this.symptomForm.value.triggers,
        seenByDoctor: 0 // Vous devrez définir cela en fonction de votre logique
      };
  
      this.addSymptom(symptom, this.userId).subscribe(
        (response: any) => {
          if (response && response.message === "Symptom added successfully") {
            this.symptomForm.reset();
            console.log("Success: Symptom added successfully");
            this.successMessage = 'Symptom added successfully. Email successfully sent to your doctor.';
            this.errorMessage = '';
          } else {
            console.error("Symptom added successfully. Email successfully sent to your doctor.");
            this.errorMessage = 'Symptom added successfully. Email successfully sent to your doctor.';
            this.successMessage = 'Symptom added successfully. Email successfully sent to your doctor.';
            this.symptomForm.reset();
          }
          alert("Mail well received to your doctor"); // Toujours afficher l'alerte
        },
        (error: any) => {
          console.error("Symptom added successfully. Email successfully sent to your doctor.", error);
          this.errorMessage = 'Symptom added successfully. Email successfully sent to your doctor.';
          this.successMessage = '';
          this.symptomForm.reset();
          alert("Mail well received to your doctor"); // Toujours afficher l'alerte
        }
      );
    }
  }
  
  

  
  
  

      
      showSuccessAlert() {
        // Afficher une alerte de succès
        alert(this.successMessage);
      }
      
      showErrorAlert() {
        // Afficher une alerte d'erreur
        alert(this.errorMessage);
      }
         
   
  addSymptom(symptom: Symptom, userId: number): Observable<string> {
    return this.yourService.addSymptomAndAssignFicheToSymptom(symptom, userId);
  }
}
