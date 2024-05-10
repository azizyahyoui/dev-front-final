import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import jwt_decode from 'jwt-decode';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: 'JWT_DECODE', useValue: jwt_decode }
  ]
})
export class JwtDecodeModule { }
