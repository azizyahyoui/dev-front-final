//import { Reponse } from "./Reponse";

import { Commentaire } from './Commentaire';

export class Publication {
  idPub!: number;
  sujet!: string;
  contenuPub!: string;
  datePub!: Date;
  likes!: number;
  dislikes!: number;
  status!: boolean;

  commentaires!: Commentaire[];

  // Include the responses property
  //responses: Reponse[];
}

  