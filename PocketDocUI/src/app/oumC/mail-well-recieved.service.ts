import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailWellRecievedService {

  constructor(private http: HttpClient) { }

  getConventionRenewal(): Observable<any> {
    return this.http.get('http://localhost:8089/api/convention/renew');
  }



}
