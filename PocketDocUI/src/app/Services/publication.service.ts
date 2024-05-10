import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Publication } from '../module/Module/Publication';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private apiURL = 'http://localhost:8089/publication';

  constructor(private http: HttpClient) { };

  getAllPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.apiURL}/retrieve-all-publications`);
  }


  deletePublication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/remove-publication/${id}`);
  }

  postPublication(publication: Publication): Observable<any> {
    console.log('Données envoyées pour l\'ajout :', publication);
    return this.http.post(`${this.apiURL}/add-publication`, publication,{responseType:"text"});
  }

  likePublication(idPub: number): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/like/${idPub}`, {});
  }

  dislikePublication(idPub: number): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/dislike/${idPub}`, {});
  }

  updatePublication(id: number, publication: any): Observable<any> {
    return this.http.put(`${this.apiURL}/publications/${id}`, publication,{responseType:"text"});

  }


  getPublication(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/retrieve-publication/${id}`);
  }



  getPublicationsOrderedByDate(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/orderByDate`);
  }

  getPublicationsOrderedByPopularity(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/orderByPopularity`);
  }


  getPublicationsOrderedByNumberOfResponses(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/orderByNumberOfResponses`);
  }


  searchPublicationsBySujet(sujet: string): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.apiURL}/search?sujet=${sujet}`);
  }

}
