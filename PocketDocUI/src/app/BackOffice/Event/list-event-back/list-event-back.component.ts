import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EventService } from 'src/app/service/event.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list-event-back',
  templateUrl: './list-event-back.component.html',
  styleUrls: ['./list-event-back.component.css']
})
export class ListEventBackComponent {
  events: any[] = [];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort ; // Déclarez MatSort
  displayedColumns: string[] = ['title', 'description', 'date', 'location', 'capacity', 'nbPlaceAvailable', 'actions'];
  searchTerm: string = '';
  selectedCategory: string = 'title'; // Par défaut, la recherche se fera par titre


  constructor(
    private shared: EventService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.shared.listeEvents().subscribe(
      res => {
        console.log(res);
        this.events = res;
        this.dataSource = new MatTableDataSource(this.events); // Initialisation de la source de données
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator; // Configuration du paginator
      },
      err => {
        console.log(err);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const searchText = filter.toLowerCase();
      switch (this.selectedCategory) {
        case 'title':
          return data.title.toLowerCase().includes(searchText);
        case 'description':
          return data.description.toLowerCase().includes(searchText);
        case 'date':
          return data.date && data.date.toString().toLowerCase().includes(searchText);
        case 'location':
          return data.location.toLowerCase().includes(searchText);
        case 'capacity':
          return data.capacity && data.capacity.toString().toLowerCase().includes(searchText); // Vérification de nullité avant conversion en chaîne
        case 'placedispo':
          return data.nbPlaceAvailable && data.nbPlaceAvailable.toString().toLowerCase().includes(searchText); // Vérification de nullité avant conversion en chaîne
          // Ajoutez d'autres cas pour d'autres catégories si nécessaire
        default:
          return false;
      }
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  

  delete(idR: number) {
    console.log("Suppression de l'événement avec l'ID :", idR);
    this.shared.supprimerEvent(idR).subscribe(
      res => {
        console.log(res);
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    ); 
  }

  modifier(id: any) {
    this.router.navigate(['/admin/modif/' + id]);
  }
}
