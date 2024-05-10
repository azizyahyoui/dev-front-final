import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicationService } from 'src/app/Services/publication.service';

@Component({
  selector: 'app-post-publication',
  templateUrl: './post-publication.component.html',
  styleUrls: ['./post-publication.component.css']
})
export class PostPublicationComponent {
  validateForm!: FormGroup;

  constructor(private publicationService: PublicationService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      sujet: [null, [Validators.required]],
      contenuPub: [null, [Validators.required]],
      // Initialisation de la date actuelle dans le formulaire
      datePub: [this.getCurrentDate(), [Validators.required]] 
    })
  }
  
  postPublication() {
    console.log('Tentative d\'ajout de publication...');
    this.publicationService.postPublication(this.validateForm.value).subscribe(res => {
      console.log('Réponse du serveur :', res);
    })
  }

  // Déclarez la méthode getCurrentDate() ici
  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    let month: string | number = today.getMonth() + 1;
    let day: string | number = today.getDate();

    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }

    return `${year}-${month}-${day}`;
  }
}
