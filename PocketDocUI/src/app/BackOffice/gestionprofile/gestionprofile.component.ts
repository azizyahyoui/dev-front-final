import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/auth/service/jwt.service';

@Component({
  selector: 'app-gestionprofile',
  templateUrl: './gestionprofile.component.html',
  styleUrls: ['./gestionprofile.component.css']
})
export class GestionprofileComponent implements OnInit {

  userId:any;
  profileImage!: string;
  user:any;
  email!: string;
  file1!: File; // Correction ici

  constructor(private route: ActivatedRoute,private fb: FormBuilder,
    private jwtService: JwtService) { }

  ngOnInit() {
    // Retrieve the id parameter from the route
    this.userId = this.route.snapshot.paramMap.get('id');
    this.fetchProfileImage();

  }

 


  fetchProfileImage() {
    // Get the user ID from local storage


  
    // Call the service method to fetch the user by ID
    this.jwtService.getUserById(this.userId).subscribe(
      (response) => {
        
       
        this.user = response.ourUsers;
        this.email = this.user.email;
      },
      (error) => {
        console.error('Error fetching profile image:', error);
      }
    );
  }

  deleuser() {
   this.jwtService.deletuser(this.userId).subscribe(
    (response) => {
      // Assuming the response contains the profile image as a base64 string
    },
    (error) => {
      console.error('Error fetching profile image:', error);
    }
  );;
    }

    acceptUser(userId: any, newStatus: any): void {
      this.jwtService.acceptUser(userId, newStatus).subscribe(
        response => {
          // Traitez la réponse ici si nécessaire
        },
        error => {
          // Gérez l'erreur ici
          console.error('Error updating user status:', error);
        }
      );
    }




}
