import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../../service/jwt.service';
import { Router } from '@angular/router';
import { EmailService } from '../../service/email.service';

@Component({
  selector: 'app-reset-password-email',
  templateUrl: './reset-password-email.component.html',
  styleUrls: ['./reset-password-email.component.css']
})
export class ResetPasswordEmailComponent {
  resetForm: FormGroup;
  message: string = ''; 
  message1: string = ''; 
  constructor(private formBuilder: FormBuilder, private authService: JwtService, private router: Router, private emailService: EmailService) {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  sendEmail() {
    

    const email = this.resetForm.value.email;
    
    // Stocker l'e-mail dans le service partagé
    this.emailService.setEmail(email);

    // Appel du service pour envoyer l'e-mail de réinitialisation
    this.authService.forgotPassword(email).subscribe(
      (response) => {
        this.router.navigate(['/reset-password']); 
        this.message1='email envoiyee avec succee'// Naviguer vers reset-password après l'envoi de l'e-mail
      },
      (error) => {
        console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
        this.message='erreur ou invalide email'
      }
    );
  }
}

