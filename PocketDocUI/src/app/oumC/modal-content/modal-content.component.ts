import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FicheService } from '../service/fiche.service';
import { JwtService } from 'src/app/auth/service/jwt.service';
import { Fiche } from '../entities/Fiche';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.css']
})
export class ModalContentComponent implements OnInit {
  ficheForm: FormGroup;
  usersWithoutFiche: any[] = []; // Assurez-vous de remplacer any par le type correct de votre utilisateur
  selectedUserId: number = 0;
  userId: number = 0;
  newFiche: Fiche = new Fiche();
  fiches: Fiche[] = [];
  constructor(
    private dialogRef: MatDialogRef<ModalContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Injectez les données passées à la modal
    private fb: FormBuilder,
    private ficheService: FicheService,private jwtService:JwtService
  ) {
    this.ficheForm = this.fb.group({
      historiq_fam: ['', Validators.required],
      eval_psy: [''],
      notes_de_suivi: [''],
      selectedUserId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.userId=this.jwtService.getUserId();
    // Chargez les utilisateurs sans fiche lors de l'initialisation de la modal
    this.loadUsersWithoutFiche();
  }

  loadUsersWithoutFiche(): void {
    this.ficheService.findUsersWithoutFiche().subscribe(
      (users: any[]) => {
        this.usersWithoutFiche = users;
      },
      (error: any) => {
        console.error('Error loading users without fiche:', error);
      }
    );
  }


  loadFiches(): void {
    this.ficheService.retrieveFiche(this.userId).subscribe(
      (response: any) => {
        if ('fiches' in response) {
          this.fiches = response['fiches'] || [];
        }
      },
      (error: any) => {
        console.error('Error loading fiches:', error);
      }
    );
  }

  addFiche(): void {
    this.newFiche.etu = this.selectedUserId;
    this.ficheService.addFiche1(this.newFiche, this.selectedUserId, this.userId).subscribe(
      (response: Fiche) => {
        this.loadFiches();
        this.newFiche = new Fiche();
        
        this.closeModal();
      },
      (error: any) => {
        console.error('Error adding fiche:', error);
      }
    );}

  closeModal(): void {
    this.dialogRef.close(false); // Fermez la modal sans ajouter de fiche
  }
}
