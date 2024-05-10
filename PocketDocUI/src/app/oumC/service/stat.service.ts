import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatService {
  private baseUrl = 'http://localhost:8089/api'; 
  constructor(private http: HttpClient) { }

  
getFichePercentageByTypeAddiction(): Observable<any> {
    const url = `${this.baseUrl}/fiche/stat-by-type-addiction`; 
    return this.http.get<any>(url);
}
getSymptomPercentageByIntensity(): Observable<any> {
  const url = `${this.baseUrl}/symptom/stat-by-intensity`; 
  return this.http.get<any>(url);
}}