import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/service/event.service';
import * as L from 'leaflet';
import { JwtService } from 'src/app/auth/service/jwt.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {

  lat !: any;
  lon !: any;
  constructor(private service:EventService,private router:Router,private jwtService: JwtService) {

  }
  ev = {
    title: '',
    description: '',
    location: '',
    capacity: '',
    date:"",
    user_id: "" ,
    x: 0.0,
    y: 0.0
  };

  ajouterEve(){
    this.lat = document.querySelector<HTMLInputElement>("#lat")!.value;
    this.lon = document.querySelector<HTMLInputElement>("#lon")!.value;
    
    this.ev.x = this.lat;
    this.ev.y = this.lon;
    console.log(this.lat);
    console.log(this.lon);

    const userId = this.jwtService.getUserId();
    this.ev.user_id = userId.toString();

    this.service.ajouterEvent(this.ev,).subscribe(
      res => {
        this.ev = {
          title: "",
          description: "",
          location: "",
          capacity: "",
          date:"",
          user_id:"",
          x: 0.0,
          y: 0.0     
        };
        console.log(res)
        this.router.navigate(['/admin/listEvent']);

      },
      err => {
        console.log(err); 
      }
    );

  }
  ngAfterViewInit(){
    let marqueur: L.Marker;
    let map = L.map("maCarte").setView([33.892166, 9.561555], 6);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


      function onMapClick(e: L.LeafletMouseEvent) {
        let pos = e.latlng;
        addMarker(pos, map);
        document.querySelector<HTMLInputElement>("#lat")!.value = pos.lat.toString();
        document.querySelector<HTMLInputElement>("#lon")!.value = pos.lng.toString();
      }

      map.on('click', onMapClick);
     
  

      function addMarker(pos: L.LatLngExpression, carte: L.Map) {
        if (marqueur != undefined) {
          carte.removeLayer(marqueur);
        }
        marqueur = L.marker(pos , {
          draggable: true
        });
        marqueur.on("dragend", function(e) {
          pos = e.target.getLatLng() as L.LatLng;
        });
      
        marqueur.addTo(map);
    }

  }

  getIdLocalStorage(){
    localStorage.getItem('id');
    console.log(localStorage.getItem('id'));
  }

  goBack(){
    this.router.navigate(['/admin/listEvent'])
  }

}
