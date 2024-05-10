import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as L from 'leaflet';
import * as leafletImage from 'leaflet-image';
import { EventService } from 'src/app/service/event.service';
import { FormDataService } from 'src/app/service/form-data.service';


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent {

  map!: L.Map
  isCheckboxChecked: boolean = false;
  previousCheckboxState: boolean = false;



  constructor(
    public dialogRef: MatDialogRef<MapViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private shared: EventService,
    private formDataService: FormDataService
  ){
  }
  
  ngOnInit(): void {
    this.initMap(this.data.x, this.data.y);
    console.log("Checkbox checked:", this.isCheckboxChecked);
  }
    
  initMap(x: number, y: number) {
    let marqueur: L.Marker;
    this.map = L.map("maCarte").setView([x, y], 9);
   
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
   
    const lat = Number(x);
    const lng = Number(y);
   
    marqueur = L.marker([lat, lng], { draggable: true }).addTo(this.map);
   
    marqueur.on("dragend", (e) => {
       const newPos = e.target.getLatLng();
       document.querySelector<HTMLInputElement>("#lat1")!.value = newPos.lat.toString();
       document.querySelector<HTMLInputElement>("#lon1")!.value = newPos.lng.toString();
    });
   }

   openGoogleMaps() {
    const url = `https://www.google.com/maps/@${this.data.x},${this.data.y},16z?entry=ttu`;
    window.open(url, '_blank'); // Ouvre l'URL dans un nouvel onglet
  }  

  closeDialog() {
    this.dialogRef.close(); // Ferme la fenêtre modale
  }
  
  sendCanvasData() {
    console.log("Checkbox checked:", this.isCheckboxChecked);
    if (this.isCheckboxChecked && !this.previousCheckboxState ) {
      console.log("Sending canvas data...");
      leafletImage(this.map, (err: any, canvas: any) => {
        if (err) {
          console.error('Erreur lors de la capture de l\'image :', err);
          return;
        }
        const blob = this.dataURLtoBlob(canvas.toDataURL('image/png'));
        const formData = new FormData();
        formData.append('image', blob, 'image.png');
        this.formDataService.setFormData(formData);
        console.log("Canvas data sent successfully!");
        // Envoyer formData au backend
      });
    } else {
      console.log("Checkbox not checked, skipping sending canvas data.");
    }
    // Mettre à jour l'état précédent de la case à cocher
    this.previousCheckboxState = this.isCheckboxChecked;
  }

  dataURLtoBlob(dataURL: string): Blob {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
  }

}