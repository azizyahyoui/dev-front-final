import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { an } from '@fullcalendar/core/internal-common';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  
  url : string = 'http://localhost:8089/events/';
  private baseUrl = 'http://localhost:8080/map';
  private apiUrl = 'http://localhost:8089/stats/';
  private url2 = "http://localhost:8089/events/send-email";

  constructor(private http: HttpClient) { }

  getEventNonInscri(id:any):Observable<any>{
    return this.http.get(this.url+"evNonInsc/"+id).pipe(
      catchError(this.handleError)
    );
  }

  ajouterEvent(med:any):Observable<any>{
    return this.http.post(this.url,med).pipe(
      catchError(this.handleError)
    );
  }

  listeEvents():Observable<any>{
    return this.http.get<any>(this.url).pipe(
      catchError(this.handleError)
    );
  }
  
  supprimerEvent(id:any):Observable<any>{
    return this.http.delete<any>(this.url+id).pipe(
      catchError(this.handleError)
    );
    
  }

  modifierEvent(med:any):Observable<any>{
    return this.http.put<any>(this.url,med).pipe(
      catchError(this.handleError)
    );
  }

  getEvent(id:any):Observable<any>{
    return this.http.get<any>(this.url+id).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur : ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Code d'erreur : ${error.status}, message : ${error.error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  getAddressFromCoordinates(longitude: any, latitude: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}getAddress?longitude=${longitude}&latitude=${latitude}`);
  }


  getEventStats(): Observable<any> {
    return this.http.get<any>(this.apiUrl+'nbInscriEvent');
  }

  getAverageInscriptions(): Observable<number> {
    return this.http.get<number>(this.apiUrl+'avInscriptions');
  }

  findEventBetweenDate(start: string, end: string): Observable<any> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);

    return this.http.get<any>(`${this.apiUrl}evBtwDate`, { params });
  }

  getEventModified(): Observable<any> {
    return this.http.get<any>(this.apiUrl+'evMod');
  }

  sendImgMap(med:any):Observable<any>{
    return this.http.post(this.url2,med).pipe(
      catchError(this.handleError)
    );
  }  
  
}
