import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commentaire } from '../module/Module/Commentaire';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  private apiURL = 'http://localhost:8089/commentaire';

  constructor(private http: HttpClient ) { };

   // Méthode pour récupérer tous les commentaires pour une publication donnée
   getCommentairesForPublication(publicationId: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/get/byPublication/${publicationId}`);
  }

  // Méthode pour ajouter un commentaire
  addCommentaire(commentaire: any): Observable<any> {
    return this.http.post<any>(this.apiURL+'/add-commentaire', commentaire);
  }

  // Méthode pour récupérer un commentaire par son ID
  getCommentaire(commentaireId: number): Observable<Commentaire> {
    return this.http.get<Commentaire>(`${this.apiURL}/retrieve-commentaire/${commentaireId}`);
  }

  // Méthode pour supprimer un commentaire par son ID
  deleteCommentaire(commentaireId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/remove-commentaire/${commentaireId}`);
  }

  // Méthode pour modifier un commentaire
  modifyCommentaire(commentaireId: number, commentaire: any): Observable<Commentaire> {
    return this.http.put<Commentaire>(`${this.apiURL}/modify/${commentaireId}`, commentaire);
  }

  // Méthode pour affecter un commentaire à une publication
  affecterCommentAPub(commentaireId: number, publicationId: number): Observable<Commentaire> {
    return this.http.put<Commentaire>(`${this.apiURL}/affecterCommentAPub/${commentaireId}/${publicationId}`, {});
  }

  // Méthode pour affecter un commentaire à un utilisateur
  affecterCommentAUser(commentaireId: number, userId: number): Observable<Commentaire> {
    return this.http.put<Commentaire>(`${this.apiURL}/affecterCommentAUser/${commentaireId}/${userId}`, {});
  }













}
