import { Component } from '@angular/core';
import { MailWellRecievedService } from '../mail-well-recieved.service';

@Component({
  selector: 'app-r',
  templateUrl: './r.component.html',
  styleUrls: ['./r.component.css']
})
export class RComponent {
  constructor(private mailWellRecievedService: MailWellRecievedService) { }

  ngOnInit(): void {
    this.getRenewalData();
  }

  getRenewalData(): void {
    this.mailWellRecievedService.getConventionRenewal().subscribe(
      (data) => {
        // Faire quelque chose avec les données reçues
        console.log(data);
      },
      (error) => {
        console.error('Une erreur s\'est produite : ', error);
      }
    );
  }
}
