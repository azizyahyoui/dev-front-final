import { HttpClient, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {
  private apiUrl="http://localhost:8089/api/dem"
  fileService: any;
  private fileDeletedSubject = new Subject<void>();

  constructor(private http:HttpClient) { }
  

  uploadFile(file: File, doctorId: number): Observable<number> {
    const formData: FormData = new FormData();
    formData.append("file", file);
  
    return this.http.post<any>(`${this.apiUrl}/upload/${doctorId}`, formData, {
      reportProgress: true, // Pour recevoir des événements de progression
      observe: 'events'
    }).pipe(
      map(event => this.getUploadProgress(event)),
      catchError(error => {
        console.error('Error uploading file:', error);
        return throwError(error); // renvoyer une erreur observable
      })
    );
  }
  


private getUploadProgress(event:any):number
{
  if(event.type === HttpEventType.UploadProgress){
    const percentDone = Math.round((event.loaded/event.total)*100);
    return percentDone;
  }
  return -1;
}
//getUserFile(userId: number): Observable<any> {
  //return this.http.get<any>(`${this.apiUrl}/files/${userId}`);
//}
getUserFiles(userId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/files/${userId}`);
}
getFilesWithUserIds(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/files-with-user-ids`);
}
getDemandes(page: number, pageSize: number, searchTerm: string, selectedCategory: string): Observable<any> {
  const params = {
    page: page.toString(),
    pageSize: pageSize.toString(),
    searchTerm: searchTerm,
    selectedCategory: selectedCategory
  };
  return this.http.get<any>(`${this.apiUrl}/demandes`, { params });
}


downloadFile(fileId: number): Observable<HttpResponse<Blob>> {
  return this.http.get(this.apiUrl + `/download/${fileId}`, {
    responseType: 'blob',
    observe: 'response',
  });
}
deleteFile(fileId: number): Observable<any> {
  return this.http.delete(this.apiUrl + `/files/${fileId}`).pipe(
    tap(() => {
      // Émettre un événement après la suppression réussie
      this.fileDeletedSubject.next();
    })
  );
}

// Méthode pour écouter l'événement de suppression de fichier réussie
fileDeleted(): Observable<void> {
  return this.fileDeletedSubject.asObservable();
}
assignDoctorCIN(doctorId: number, cin: string): Observable<string> {
  const url = `${this.apiUrl}/cinuser/${doctorId}/${cin}`;
  return this.http.post<string>(url, {}).pipe(
    catchError(this.handleError)
  );
}

private handleError(error: HttpErrorResponse) {
  let errorMessage = 'Something bad happened; please try again later.';
  if (error.error instanceof ErrorEvent) {
    // Erreur côté client
    errorMessage = error.error.message;
  } else {
    // Erreur côté serveur
    errorMessage = error.error;
  }
  console.error(errorMessage);
  return throwError(errorMessage);
}}