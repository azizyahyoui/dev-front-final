import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { CosineSimilarityService } from '../service/sc.service';
import { GeminiService } from '../service/gemini.service';

@Component({
  selector: 'app-affi-gemini',
  templateUrl: './affi-gemini.component.html',
  styleUrls: ['./affi-gemini.component.css']
})
export class AffiGeminiComponent {
  title = 'gemini-inte';
  prompt: string = '';
  loading: boolean = false;
  chatHistory: any[] = [];
  noSimilarityAlert: boolean = false;
  constructor(
    private geminiService: GeminiService,
    private http: HttpClient,
    private cosineSimilarityService: CosineSimilarityService
  ) {
    this.geminiService.getMessageHistory().subscribe((res) => {
      if (res) {
        this.chatHistory.push(res);
      }
    });
  }

  async sendData() {
    if (this.prompt && !this.loading) {
      this.loading = true;
      const data = this.prompt;
      this.prompt = '';
  
      const apiQuestions = await this.http.get<any[]>('http://localhost:3000/questions').toPromise();
      if (apiQuestions && apiQuestions.length > 0) {
        let isSimilar = false;
        for (const apiQuestion of apiQuestions) {
          const question = apiQuestion.question; // Extrayez la question de l'objet
          if (this.cosineSimilarityService.calculateCosineSimilarity(data, question)) {
            isSimilar = true;
            await this.geminiService.generateText(data);
            break;
          }
        }
        if (!isSimilar) {
          alert(' Please ask only questions in psychological health domain !! ');
        }
      } else {
        alert('Aucune question trouvée dans la base de données.');
      }
      this.loading = false;
    }
  }
  
  formatText(text: string): string {
    return text.replaceAll('*', '');
  }
}
