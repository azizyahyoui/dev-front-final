import { Component, OnInit } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
interface Doctor {
  id: number;
  name: string;
  lastname: string;
  city: string;
  country: string;
  rue: string;
  codePostal: string;
  datenaissance: Date;
  aboutme: string;
  email: string;
  password: string;
  telephone: number;
  profileImageUrl1: string;
  
}

@Component({
  selector: 'app-list-doctor',
  templateUrl: './list-doctor.component.html',
  styleUrls: ['./list-doctor.component.css']
})
export class ListDoctorComponent implements OnInit {
  doctors: Doctor[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors(): void {
    this.http.get<any[]>('http://localhost:8089/docteur/all_doctors').subscribe(
      (doctor) => {
        this.doctors = doctor;
        console.log(this.doctors);
      },
      error => {
        console.error('Error fetching doctors:', error);
      }
    );
  }
}