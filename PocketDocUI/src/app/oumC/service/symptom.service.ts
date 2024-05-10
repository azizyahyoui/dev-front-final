import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Symptom } from '../entities/Symptom';

@Injectable({
  providedIn: 'root'
})
export class SymptomService {
  private baseUrl="http://localhost:8089/api/symptom"

  constructor(private http: HttpClient) { }
  findSymptomByUserId(userId: number): Observable<[Symptom[], string][]> {
    const url = `${this.baseUrl}/retrieve-symptom/${userId}`;
    return this.http.get<[Symptom[], string][]>(url);
  }

  getSymptomsWithUser(): Observable<Map<string, any>[]> {
    return this.http.get<Map<string, any>[]>(`${this.baseUrl}/retrieve-all-symptoms`);
  }

  addSymptomAndAssignFicheToSymptom(symptom: Symptom, userId: number): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/add-symptom/${userId}`, symptom);
  }

  retrieveSymptomWithUser(symptomId: number): Observable<Map<string, any>> {
    return this.http.get<Map<string, any>>(`${this.baseUrl}/retrieve-symptom1/${symptomId}`);
  }

  removeSymptom(symptomId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove-symptom/${symptomId}`);
  }

  modifySymptom(symptom: Symptom): Observable<Symptom> {
    return this.http.put<Symptom>(`${this.baseUrl}/modify-symptom/${symptom.id}`, symptom);
  }

  countUnseenSymptomsForFiche(ficheId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count-unseen-symptoms/${ficheId}`);
  }
}

