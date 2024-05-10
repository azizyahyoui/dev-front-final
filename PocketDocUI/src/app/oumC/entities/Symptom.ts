import { Fiche } from "./Fiche";

export interface Symptom {
    id?: number;
    type?: string;
    date?: Date;// ou utilisez le type Date si vous préférez
    severity?: string; // ou utilisez un enum si vous en avez un défini côté client
    description?: string;
    location?: string;
    duration?: string;
    triggers?: string;
    myFiche?: Fiche;
    seenByDoctor?: number;
  }