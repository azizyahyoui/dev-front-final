import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtDecodeModule } from 'src/app/jwt-decode/jwt-decode.module'; 

import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { each } from 'chart.js/dist/helpers/helpers.core';

import * as CryptoJS from 'crypto-js';






// Utilisez jwtDecode au lieu de jwt_decode dans votre code



const BASE_URL = "http://localhost:8089/auth/";

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  
  private role!: string;
  private user!: any;
  private userRole: string = '';
  private isAuthenticated: boolean = false;


  constructor(private http: HttpClient,private router: Router,private cookieService: CookieService, @Inject('JWT_DECODE') private jwtDecode: any) { }
  token!: string | null;
  
  register(signRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'all/signup', signRequest).pipe(
      catchError((error: any) => {
        console.error('An error occurred:', error);
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }
  
  
  decodeToken(token: string): any {
   return this.jwtDecode(token);
  }

 getToken(): string {
    const encryptedToken = this.cookieService.get('token');
   
        return this.decryptAES(encryptedToken);
  
}
  

login(loginRequest: any): Observable<any> {
  this.getUserRole;
  return this.http.post<any>(BASE_URL + 'all/signin', loginRequest)
    .pipe(
      tap((response: any) => {
      }),
      catchError(error => {
        this.isAuthenticated = false;
        return throwError(error);
      })
    );
   
}

  decodetoken() {
    this.token = this.cookieService.get('token');
    const decodedToken: any = this.decodeToken(this.token);
    const role = decodedToken.role;
    return role;
  }
  


  

  getUserRole(): string | null {
    this.token = this.getToken();
  
    // Vérifier si le token est vide ou non défini
    if (!this.token) {
      return null;
    }
  
    const decodedToken: any = this.decodeToken(this.token);
    const role = decodedToken.role;
    return role;
  }
  

getUserId(): number {
  this.token = this.getToken();
    const decodedToken: any = this.decodeToken(this.token);
    const userId = decodedToken.userId;
    return userId;
}



  public  isAuthenticated1(): boolean {
    return this.isAuthenticated;
  }
  getUserById(userId: number): Observable<any> {
    const url = `${BASE_URL}all/users/${userId}`;
    return this.sendAuthorizedRequest('GET', url, null);
  }
  
  getUserByEmail(email: string): Observable<any> {
    const url = `${BASE_URL}all/user/${email}`;
    return this.sendAuthorizedRequest('GET', url, null).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération de l\'utilisateur par email:', error);
        return throwError(error);
      })
    );
  }
  


  forgotPassword(email: string): Observable<any> {
    return this.http.post(BASE_URL + 'all/forgot-password', { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(BASE_URL + 'all/reset-password', { token, newPassword });
  }

  sendAuthorizedRequest(method: string, url: string, requestData: any): Observable<any> {
    const token = this.getToken();
    if (!token) {
      // Gérer le cas où le token n'est pas disponible
      return throwError('Token not available.');
    }

    const headers = {
      'Authorization': `Bearer ${token}`
    };

    return this.http.request(method, url, { body: requestData, headers }).pipe(
      catchError(error => {
        // Gérer les erreurs de requête
        return throwError(error);
      })
    );
  }
  uploadProfileImage(email: string, profileImage: File): Observable<any> {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('profileImage', profileImage);

    return this.http.post('http://localhost:8089/auth/all/profileimage', formData);
  }
  uploadProfileImage1(email: string, profileImage1: File): Observable<any> {
    const url = 'http://localhost:8089/auth/all/profileimage1';
    const formData = new FormData();
    formData.append('email', email);
    formData.append('profileImage1', profileImage1);
  
    return this.sendAuthorizedRequest('POST', url, formData);
  }
  updateUser(userId: any, userData: any): Observable<any> {
    const url = `${BASE_URL}all/users/${userId}`;
    return this.sendAuthorizedRequest('PUT', url, userData);
  }
  roleUser(userId: any, userData: any): Observable<any> {
    const url = `${BASE_URL}admin/role/${userId}`;
    return this.sendAuthorizedRequest('PUT', url, userData);
  }
  getUsers(): Observable<any> {
    const url = `${BASE_URL}admin/users`;
    return this.sendAuthorizedRequest('GET', url, null);
  }
  deletuser(userId: any): Observable<any> {
    const url = `${BASE_URL}admin/users/${userId}`;
    return this.sendAuthorizedRequest('DELETE', url, null);
  }
  acceptUser(userId: any, newStatus: any): Observable<any> {
    const url = `${BASE_URL}admin/${userId}/status?newStatus=${newStatus}`;
    return this.sendAuthorizedRequest('PUT', url, {});
  }
  
  public logout(): void {
  
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }
  countVerifiedUsers(): Observable<number> {
    const url = `${BASE_URL}admin/verified/count`;
    return this.sendAuthorizedRequest('GET', url, null);
  }

  getAgePercentages(): Observable<number[]> {
    const url = `${BASE_URL}admin/age/percentage`;
    return this.sendAuthorizedRequest('GET', url, null);
  }
  

  encryptAES(message: string): string {
    // Convertir la clé en une clé de 128 bits (16 caractères)
     const fixedKey = 'h1u7R3e2a9lS4e5c8r3e7t';

    // Chiffrer le message avec AES en mode CBC (Cipher Block Chaining)
    const encryptedMessage = CryptoJS.AES.encrypt(message, fixedKey, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    // Renvoyer le message chiffré en format Base64
    return encryptedMessage.toString();
}


decryptAES(ciphertext: string): string {
    // Convertir la clé en une clé de 128 bits (16 caractères)
    const fixedKey = 'h1u7R3e2a9lS4e5c8r3e7t';

    // Déchiffrer le message avec AES en mode CBC (Cipher Block Chaining)
    const decryptedBytes = CryptoJS.AES.decrypt(ciphertext, fixedKey, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    // Renvoyer le message déchiffré en tant que chaîne de caractères
    return decryptedBytes.toString(CryptoJS.enc.Utf8);
}


}


