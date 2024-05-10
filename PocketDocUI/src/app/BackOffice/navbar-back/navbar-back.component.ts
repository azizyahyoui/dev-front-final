import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/auth/service/jwt.service';

@Component({
  selector: 'app-navbar-back',
  templateUrl: './navbar-back.component.html',
  styleUrls: ['./navbar-back.component.css']
})
export class NavbarBackComponent {
    profileImage: string | undefined;
    userId: any;
    user:any;
  
    constructor(
      private jwtService: JwtService,
      private router: Router,

    ) { }
  
    ngOnInit() {
      this.fetchProfileImage();
    }
  
    fetchProfileImage() {
      // Get the user ID from local storage
      this.userId = this.jwtService.getUserId();
  
      // Check if the user ID is available
      if (!this.userId) {
        console.error('User ID not found in local storage');
        return;
      }
    
      // Call the service method to fetch the user by ID
      this.jwtService.getUserById(this.userId).subscribe(
        (response) => {
          console.log('Service response:', response); // Log the response before conversion
          // Assuming the response contains the profile image as a base64 string
          this.user = response.ourUsers;
        },
        (error) => {
          console.error('Error fetching profile image:', error);
        }
      );
    }
  
    logout() {
      
      this.jwtService.logout()
    }
}
