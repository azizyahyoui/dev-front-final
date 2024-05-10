import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CosineSimilarityService {

  constructor() { }

  calculateCosineSimilarity(sentence1: string, sentence2: string): boolean {
    if (typeof sentence1 !== 'string' || typeof sentence2 !== 'string') {
      throw new Error('Les phrases doivent être des chaînes de caractères');
    }

    const vector1 = this.getVectorFromSentence(sentence1);
    const vector2 = this.getVectorFromSentence(sentence2);

    const dotProduct = this.dotProduct(vector1, vector2);
    const magnitude1 = this.magnitude(vector1);
    const magnitude2 = this.magnitude(vector2);

    const cosineSimilarity = dotProduct / (magnitude1 * magnitude2);

    return cosineSimilarity > 0.25; // Définir votre seuil ici
  }

  private getVectorFromSentence(sentence: string): Map<string, number> {
    // Vérifier que la phrase est une chaîne de caractères
    if (typeof sentence !== 'string') {
      throw new Error('La phrase doit être une chaîne de caractères');
    }

    const words = sentence.toLowerCase().match(/\b\w+\b/g) || [];
    const vector = new Map<string, number>();

    for (const word of words) {
      vector.set(word, (vector.get(word) || 0) + 1);
    }

    return vector;
  }

  private dotProduct(vector1: Map<string, number>, vector2: Map<string, number>): number {
    let dotProduct = 0;
    for (const [word, count] of vector1.entries()) {
      dotProduct += count * (vector2.get(word) || 0);
    }
    return dotProduct;
  }

  private magnitude(vector: Map<string, number>): number {
    let sum = 0;
    for (const count of vector.values()) {
      sum += count ** 2;
    }
    return Math.sqrt(sum);
  }
}
