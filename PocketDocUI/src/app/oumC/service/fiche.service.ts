import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fiche } from '../entities/Fiche';
import { OurUsers } from '../entities/OurUsers';
import{FicheWithFullName} from '../entities/FicheWithFullName';
@Injectable({
  providedIn: 'root'
})
export class FicheService {
  private baseUrl = 'http://localhost:8089/api/fiche'
  private loadedFiches: Fiche[] = [];
  constructor(private http: HttpClient) { }

  getFichePercentageByTypeAddiction(): Observable<any> {
    return this.http.get(`${this.baseUrl}/stat-by-type-addiction`);
  }

  addFiche1(fiche: any, userId: number, doctorId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-fiche/${userId}/${doctorId}`, fiche);
  }
 // addFiche2(doctorId: number, fiche: Fiche): Observable<Fiche> {
   // return this.http.post<Fiche>(`${this.baseUrl}/add-fiche/${doctorId}`, fiche);
 // }
  findUsersWithoutFiche(): Observable<OurUsers[]> {
    return this.http.get<OurUsers[]>(`${this.baseUrl}/without-fiche`);
  }
 
  retrieveFiche(userId: number): Observable<Map<string, Object>> {
    const url = `${this.baseUrl}/retrieve-fiches/${userId}`;
    return this.http.get<Map<string, Object>>(url);
  }
 /*retrieveFiches(userId: number, startIndex: number, pageSize: number): Observable<any> {
  const url = `${this.baseUrl}/retrieve-fiches/${userId}`;
  let params = new HttpParams();
  params = params.append('startIndex', startIndex.toString());
  params = params.append('pageSize', pageSize.toString());

  // Ne récupère que les fiches qui n'ont pas encore été chargées
  const fichesToLoad = this.loadedFiches.slice(startIndex, startIndex + pageSize);

  return this.http.get<any>(url, { params: params, headers: { 'Content-Type': 'application/json' } });
}*/
//retrieveFichesAndUsernamesByUserId(userId: number): Observable<FicheWithFullName[]> {
  //const url = `${this.baseUrl}/retrieve-fiches-with-usernames/${userId}`;
  //return this.http.get<FicheWithFullName[]>(url);
//



getTotalFiches(userId: number): Observable<number> {
  const url = `${this.baseUrl}/total-fiches/${userId}`;
  return this.http.get<number>(url);
}
  removeFiche(ficheId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove-fiche/${ficheId}`);
  }

  modifyFiche(fiche: any, ficheId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/modify-fiche/${ficheId}`, fiche);
  }

  getNextFicheId(): Observable<any> {
    return this.http.get(`${this.baseUrl}/next-fiche-id`);
  }
  getEtudiantIdByFicheId(ficheId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/${ficheId}`);
  }  



  getFicheById(ficheId: number): Observable<Fiche> {
    return this.http.get<Fiche>(`${this.baseUrl}/get-fiche/${ficheId}`);
  }
}