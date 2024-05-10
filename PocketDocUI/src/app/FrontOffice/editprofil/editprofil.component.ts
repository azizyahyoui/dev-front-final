import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/auth/service/jwt.service';

@Component({
  selector: 'app-editprofil',
  templateUrl: './editprofil.component.html',
  styleUrls: ['./editprofil.component.css']
})
export class EditprofilComponent implements OnInit {
  userForm: FormGroup;
  userId: any;
  user: any;
  formattedDateOfBirth: string= '';
  
  constructor(
    private formBuilder: FormBuilder,
    private jwtService: JwtService,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: [''],
      telephone: [''],
      city: [''],
      country: [''],
      rue: [''],
      codePostal: [''],
      datenaissance: [''],
      aboutme: ['']
      // Ajoutez de nouveaux champs ici si nécessaire
    });
  }

  ngOnInit() {
    this.userId = this.jwtService.getUserId();
    if (!this.userId) {
      console.error('User ID not found in local storage');
      return;
    }
    this.fetchUserData();
  }

  fetchUserData() {
    this.jwtService.getUserById(this.userId).subscribe(
      (response) => {
        this.user = response.ourUsers; // Assign response to this.user
        
        // Convertir la date de naissance en un objet Date
        const dateNaissance = new Date(this.user.datenaissance);
  
        // Formater la date de naissance dans le format souhaité
        this.formattedDateOfBirth = dateNaissance.toISOString().slice(0, 10); // Garder uniquement yyyy-MM-dd
  
        // Remplir le formulaire avec les données de l'utilisateur
        this.userForm.patchValue({
          name: this.user.name,
          lastname: this.user.lastname,
          telephone: this.user.telephone,
          city: this.user.city,
          country: this.user.country,
          rue: this.user.rue,
          codePostal: this.user.codePostal,
          datenaissance: this.formattedDateOfBirth, // Utiliser la date formatée
          aboutme: this.user.aboutme
        });
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
  
  saveChanges() {
    const userData = { ...this.userForm.value };
  
    // Récupérer la date de naissance du formulaire
    const birthdate = this.userForm.get('datenaissance')?.value;

    if (birthdate) {
      // Convertir la chaîne de date en objet Date JavaScript
      const dateOfBirth = new Date(birthdate);
  
      // Formater la date en format 'yyyy-MM-dd HH:mm:ss'
      const formattedBirthdate = dateOfBirth.toISOString();
      userData['datenaissance'] = formattedBirthdate;
    } else {
      delete userData['datenaissance'];
    }
  
    this.jwtService.updateUser(this.userId, userData).subscribe(
      (response) => {
        this.router.navigate(['/profile']);
      
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }
}