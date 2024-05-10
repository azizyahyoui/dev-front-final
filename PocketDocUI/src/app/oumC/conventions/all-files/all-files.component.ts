import { Component, OnInit } from '@angular/core';
import { FileServiceService } from '../../service/file-service.service';
import { JwtService } from 'src/app/auth/service/jwt.service';

@Component({
  selector: 'app-all-files',
  templateUrl: './all-files.component.html',
  styleUrls: ['./all-files.component.css']
})
export class AllFilesComponent implements OnInit {
  files: any[] = [];
  userId!: number;
  
  
  constructor(private fileService: FileServiceService,private jwtService: JwtService) { }

  ngOnInit() {
    
    const userId = this.jwtService.getUserId();
      if (!isNaN(userId)) {
        this.userId = userId;
        this.getAllFiles(userId);
      }
    }
  

  isImageFile(file: any): boolean {
    return file.contentType.startsWith('image/');
  } // Ajouter une accolade fermante

  downloadFile(fileId: number, fileName: string): void {
    this.fileService.downloadFile(fileId).subscribe((response: any) => {
      const contentType = response.headers.get("Content-Type");
      const blobPart = response.body;

      if (blobPart) {
        const blob = new Blob([blobPart], { type: contentType });

        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;

        link.click();

        window.URL.revokeObjectURL(link.href);
        link.remove();
      } else {
        console.log("Impossible d'extraire le fichier");
      }
    });
  }

  deleteFile(fileId: number): void {
    if (confirm("Voulez-vous vraiment supprimer ce fichier?")) {
      this.fileService.deleteFile(fileId).subscribe(
        () => {
          alert("Fichier supprimé avec succès!");
          this.getAllFiles(this.userId); // Remplacer userId par this.userId
        },
        error => {
          console.error('Erreur lors de la suppression du fichier:', error);
        }
      );
    }
  }

  getAllFiles(userId: number): void {
    this.fileService.getUserFiles(userId).subscribe(
      (response: any[]) => {
        this.files = response.map(file => ({
          ...file,
          processedImage: 'data:image/jpeg;base64,' + file.data // Vous devrez peut-être ajuster cela en fonction de la structure de vos fichiers
        }));
      },
      error => {
        console.error('Erreur lors de la récupération des fichiers:', error);
      }
    );
  }
  
  
}

