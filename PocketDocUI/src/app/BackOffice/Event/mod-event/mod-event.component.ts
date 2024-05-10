import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/service/event.service';
import * as L from 'leaflet';
import { JwtService } from 'src/app/auth/service/jwt.service';

@Component({
  selector: 'app-mod-event',
  templateUrl: './mod-event.component.html',
  styleUrls: ['./mod-event.component.css']
})
export class ModEventComponent {

  constructor(private service:EventService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private jwtService: JwtService
  ) {
  }

event:any
id:any

routeSub!: Subscription;

lat !: any;
lon !: any;

ngOnInit(): void {

this.event={
  title:null,
  description:null,
  location: null,
  capacity:null,
  date:null,
  user_id: null,
  lat: null,
  lon: null
}

this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
  this.id = params['id']; });
 
 this.service.getEvent(this.id).subscribe(p =>{
  console.log(p);
  this.event = p;

});

}

modifierEve(){
  this.lat = document.querySelector<HTMLInputElement>("#lat")!.value;
  this.lon = document.querySelector<HTMLInputElement>("#lon")!.value;
  this.event.x = this.lat;
  this.event.y = this.lon;

const userId = this.jwtService.getUserId()
this.event.user_id = userId ? userId : ''

  console.log()
this.service.modifierEvent(this.event,).subscribe(
  res => {
    this.event = {
      title: '',
      description: '',
      capacity: '',
      date:"",
      user_id: "",
      lat: "",
      lon: ""
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


goBack(){
  this.router.navigate(['admin/listEvent'])
}


}