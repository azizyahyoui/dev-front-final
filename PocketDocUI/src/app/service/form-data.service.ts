import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  private formDataSubject = new BehaviorSubject<FormData | null>(null);

  constructor() { }

  setFormData(formData: FormData) {
    this.formDataSubject.next(formData);
  }

  getFormData() {
    return this.formDataSubject.asObservable();
  }}
