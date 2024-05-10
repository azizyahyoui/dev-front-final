//import { Reclamation } from "./Reclamation";

export class Commentaire {
  idCom: number = 0;
  contenuCom!: string;
  dateCom!: Date;

  publicationId!: number; 


  // Make reclamation property optional
  //reclamation?: Reclamation;
}
