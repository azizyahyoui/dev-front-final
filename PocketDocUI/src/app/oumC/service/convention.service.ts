import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Convention } from '../entities/Convention';


@Injectable({
  providedIn: 'root'
})
export class ConventionService {
  private apiURL = 'http://localhost:8089/api/convention';

  constructor(private http: HttpClient) { }

  getConventions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/retrieve-all-conventions`);
  }

  addConvention(convention: Convention, doctorId: number): Observable<Convention> {
    return this.http.post<Convention>(`${this.apiURL}/add-convention/${doctorId}`, convention);
  }

  updateConvention(conventionId: number, updatedConventionData: Convention): Observable<Convention> {
    const updateUrl = `${this.apiURL}/modify-convention/${conventionId}`;
    return this.http.put<Convention>(updateUrl, updatedConventionData);
  }
  
  getConventionById(id: number): Observable<Convention> {
    return this.http.get<Convention>(`${this.apiURL}/retrieve-convention/${id}`).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération de la convention:', error);
        if (error.status === 404) {
          return throwError("La convention n'a pas été trouvée.");
        }
        return throwError("Une erreur s'est produite lors de la récupération de la convention.");
      })
    );
  }

  supprimerConvention(idConv: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/remove-convention/${idConv}`);
  }
  exportPdf(userId: number): Observable<Blob> {
    const url = `${this.apiURL}/export/pdf/${userId}`;
    return this.http.get(url, { responseType: 'blob' });
  }
  exportExcel(): Observable<Blob> {
    const url = `${this.apiURL}/export/excel`;
    return this.http.get(url, { responseType: 'blob' });
  }
  isConventionExpired(userId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiURL}/testConvention/${userId}`);
  }
  
}