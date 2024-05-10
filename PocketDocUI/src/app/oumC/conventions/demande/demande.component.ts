import { Component, OnInit, ViewChild } from '@angular/core';
import { JwtService } from 'src/app/auth/service/jwt.service';
import { Convention } from '../../entities/Convention';


import { FileServiceService } from '../../service/file-service.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { AllFilesComponent } from '../all-files/all-files.component';


@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {
  @ViewChild(UploadFileComponent) uploadComponent!: UploadFileComponent;
  @ViewChild(AllFilesComponent) allComponent!: AllFilesComponent;
  convention: Convention | undefined;
  isExpired: boolean = false;
  isModalOpen: boolean = false;
  cinNumber: string = "";
  userId: number = 0;


  demandes: Convention[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 1;
  


  constructor(private jwtService: JwtService,
    private fileUploadService: FileServiceService,
    private router: Router) {


  }


  ngOnInit(): void {
    
      const userId = this.jwtService.getUserId();
      if (!isNaN(userId)) {
        this.userId = userId;
        this.fetchDemandes();
      }
    }
  




  fetchDemandes(): void {
    this.fileUploadService.getUserFiles(this.userId)
      .subscribe((demandes: Convention[]) => {
        this.demandes = demandes;
      });
  }


  // Méthode pour obtenir la demande de la page actuelle
  getCurrentPageDemande(): Convention | undefined {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.demandes[startIndex];
  }


  // Méthodes pour naviguer entre les pages
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }


  nextPage(): void {
    if (this.currentPage < this.demandes.length) {
      this.currentPage++;
    }
  }






  openModal() {
    const modalDiv = document.getElementById('myModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }
  }


  closeModal() {
    const modalDiv = document.getElementById('myModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'none';


    }
  }








  assignCIN(userId: any, cin: any): void {
    const parsedUserId = Number(userId);
    const parsedCin = String(cin);


    this.fileUploadService.assignDoctorCIN(parsedUserId, parsedCin).subscribe(
      (response) => {
        console.log('Response from server:', response);
        // Gérez la réponse ici, par exemple, affichez un message de confirmation à l'utilisateur
      },
      (error) => {
        console.error('Error from server:', error);
        // Gérez l'erreur ici, par exemple, affichez un message d'erreur à l'utilisateur
      }
    );
  }
  assign() {
    // Convertir userId en number et cinNumber en string
    const parsedUserId = Number(this.userId);
    const parsedCin = String(this.cinNumber);


    this.assignCIN(parsedUserId, parsedCin);
  }


  assignAndUpload(): void {




    if (this.uploadComponent) {
      this.uploadComponent.uploadFile(); // Appelez la méthode uploadFile du composant UploadFileComponent
    }


    // Convertir userId en number et cinNumber en string
    const parsedUserId = Number(this.userId);




    this.closeModal();
    if (this.allComponent) {
      this.allComponent.getAllFiles(this.userId); // Appelez la méthode uploadFile du composant UploadFileComponent
    }
  }
}