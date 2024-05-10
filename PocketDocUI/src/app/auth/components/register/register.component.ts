import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../../service/jwt.service';
import { Router } from '@angular/router';
import { EmailService } from '../../service/email.service'; // Assurez-vous d'importer EmailService

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  type: string = "password";
  istext: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  message: string = ''; 

  registerForm!: FormGroup;

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private router: Router,
    private emailService: EmailService // Correction de la typo
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      role: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      rue: ['', [Validators.required]],
      codePostal: ['', [Validators.required]],
      datenaissance: [null, [Validators.required]], // Modifier ici pour utiliser un contrôle de type Date
      aboutme: ['']
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value; // Utilisation de l'opérateur de sécurité de navigation
    const confirmPassword = formGroup.get('confirmPassword')?.value; // Utilisation de l'opérateur de sécurité de navigation
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true }); // Utilisation de l'opérateur de sécurité de navigation
    } else {
      formGroup.get('confirmPassword')?.setErrors(null); // Utilisation de l'opérateur de sécurité de navigation
    }
  }

  submitForm() {
    this.service.register(this.registerForm.value).subscribe(
      (response) => {
        if (response.statusCode === 200) {
          const role = this.registerForm.get('role')?.value; // Utilisation de l'opérateur de sécurité de navigation
          if (role === 'DOCTOR') {
            // Redirection vers le composant pour ajouter un diplôme
            this.emailService.setEmail(this.registerForm.get('email')?.value); // Utilisation de l'opérateur de sécurité de navigation et correction de la typo
            this.router.navigate(['/adddiplome']);
           
          }
          else{
            this.router.navigate(['/login']);
          }
          
        } 
        else {
          this.message=response.message;
         
        }
      },
      (error) => {
        console.error("Error:", error);
     
      }
    );
  }

  hideShowPass() {
    this.istext = !this.istext;
    this.istext ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.istext ? this.type = "text" : this.type = "password";
  }
}
