import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Commentaire } from '../../module/Module/Commentaire';
import { CommentaireService } from '../../Services/commentaire.service';

@Component({
  selector: 'app-post-commentaire',
  templateUrl: './post-commentaire.component.html',
  styleUrls: ['./post-commentaire.component.css']
})
export class PostCommentaireComponent implements OnInit {

  newCommentForm: FormGroup;

  @Output() commentaireAjoute: EventEmitter<Commentaire> = new EventEmitter<Commentaire>();

  constructor(private formBuilder: FormBuilder, private commentaireService: CommentaireService) {
    this.newCommentForm = this.formBuilder.group({
      contenuCom: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  /*ngOnInit() {
    this.validateForm = this.fb.group({
      contenuCom: [null, [Validators.required]],
      // Initialisation de la date actuelle dans le formulaire
      datePub: [this.getCurrentDate(), [Validators.required]] 
    })
  }*/
  
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



  ajouterCommentaire(publicationId: number) {
    if (this.newCommentForm.valid) {
      const contenuCom = this.newCommentForm.value.contenuCom;
      const nouveauCommentaire: Commentaire = {
        idCom: 0, // Assurez-vous que idCom est initialisé avec une valeur de type number
        contenuCom: contenuCom,
        dateCom: new Date(),
        publicationId: publicationId
      };
      this.commentaireService.addCommentaire(nouveauCommentaire).subscribe(
        (commentaire: Commentaire) => {
          this.commentaireAjoute.emit(commentaire);
          this.newCommentForm.reset();
        },
        (erreur) => {
          console.log('Erreur lors de l\'ajout du commentaire : ', erreur);
        }
      );
    }
  }
}
