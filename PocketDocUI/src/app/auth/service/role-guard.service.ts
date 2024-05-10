import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtService } from './jwt.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private authService: JwtService, private router: Router,private cookieService: CookieService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
   
    const expectedRoles = route.data['expectedRoles'];
     // Récupérer le rôle depuis le stockage local
  
    // Vérifier si l'utilisateur possède l'un des rôles attendus
  
    const role: string | null = this.authService.getUserRole();
    

     if (role !== null && expectedRoles.includes(role.toString())) {
      return true; // Autoriser l'accès à la route
    } else {
      this.cookieService.delete('token');
      
      this.router.navigate(['/login']); 
      return false; 
    }
  }
  
}
