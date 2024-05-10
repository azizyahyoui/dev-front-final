import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from '../../service/jwt.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  type: string = "password";
  istext: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;
  message: string = ''; 

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      
    });
  }

  submitForm() {
    if (this.loginForm) { // Vérifie que loginForm est défini
      this.service.login(this.loginForm.value).subscribe(
        (response) => {

          
          this.message=response.message;
          
         

          if (response.token != null) {
            const encryptedToken = this.service.encryptAES(response.token);
           
            // Stocker le jeton crypté dans les cookies
            this.cookieService.set('token', encryptedToken);

            //////////////
         

            // Vérifier le rôle de l'utilisateur et rediriger en conséquence
            switch (response.role) {
              case 'ADMIN':
                this.router.navigateByUrl("/admin/users");
                break;
                case 'USER':
                  this.router.navigateByUrl("/URGENTcase");
                  break;
                  case 'DOCTOR':
                    this.router.navigateByUrl("/docURGENT");
                    break;
            }
          }
        }
      );
    } else {
      console.error("this.loginForm is undefined"); 
     // Gestion de l'erreur
    }
  }

  hideShowPass() {
    this.istext = !this.istext;
    this.istext ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.istext ? this.type = "text" : this.type = "password";
  }
}
