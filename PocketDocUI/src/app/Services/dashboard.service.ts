import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiURL = 'http://localhost:8089/publication';

  constructor(private http: HttpClient) { };

  // getAllPubMensuel(): Observable<any> {
  //   return this.http.get<any>(`${this.apiURL}/publications-par-mois`);
  // }

  async getAllPubMensuel(): Promise<any> {
    const response = await this.http.get<any>(`${this.apiURL}/publications-par-mois`).toPromise();
    return response;
  }
}
