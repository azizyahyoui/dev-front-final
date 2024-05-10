import { Component } from '@angular/core';
import { JwtService } from 'src/app/auth/service/jwt.service';

@Component({
  selector: 'app-header-front',
  templateUrl: './header-front.component.html',
  styleUrls: ['./header-front.component.css']
})
export class HeaderFrontComponent {
    profileImage: string | undefined;
    userId: any;
    user:any;
    userRole!: string;
  
    
    constructor(private jwtService: JwtService) { }
  
    ngOnInit() {
      this.fetchProfileImage();
  
    }
  
    fetchProfileImage() {
      // Get the user ID from local storage
      
      this.userId = this.jwtService.getUserId();
      
      const userRole = this.jwtService.getUserRole();
      if (userRole !== null) {
        this.userRole = userRole;
      } else {
        // Gérer le cas où getUserRole() retourne null
      }
    
      // Check if the user ID is available
      if (!this.userId) {
        console.error('User ID not found in local storage');
        return;
      }
    
      // Call the service method to fetch the user by ID
      this.jwtService. getUserById(this.userId).subscribe(
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
    }}