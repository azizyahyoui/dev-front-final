import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { JwtService } from 'src/app/auth/service/jwt.service';
import Chart, { ChartOptions } from 'chart.js/auto';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {

  users: any[] = [];
  paginatedUsers: any;
  currentPage: number = 1;
  totalUsers: number = 0;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  pages: number[] = [];
  @ViewChild('myChart') myChart!: ElementRef;
  chart: any;
  @ViewChild('myChart1') myChart1!: ElementRef;
  chart1: any;
  user: any;
  selectedRole: string = '';
  selectedUser: any;
  searchText:any;
  searchStatus:any;
  sortColumn: string = 'id'; 
  sortOrder: string = 'asc'; 
  
  constructor(
    private jwtService: JwtService,
    private router: Router 
  ) { this.searchText = ''; 
  this.searchStatus = '';

}

ngOnInit() {
  this.loadUsers();
  
  if (this.user && this.user.role) {
    this.selectedRole = this.user.role;
}
}

  ngAfterViewInit() {
    this.createChart();
    this.createChart1();
  }

  search() {
    const searchText = this.searchText.toLowerCase().trim();
    if (!searchText && !this.searchStatus) {
      this.paginatedUsers = this.users;
      this.paginateUsers(this.paginatedUsers);
      return;
    }
    
    const filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(searchText) ||
      user.email.toLowerCase().includes(searchText) ||
      user.role.toLowerCase().includes(searchText) 
    );
  
    this.paginatedUsers = filteredUsers;
    this.paginateUsers(this.paginatedUsers);
  }
  
  
  paginateUsers(users: any[]) {
    this.totalUsers = users.length;
    this.totalPages = Math.ceil(this.totalUsers / this.itemsPerPage);
    this.updatePages();
  
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalUsers);
    this.paginatedUsers = users.slice(startIndex, endIndex);
  }
  
  

  
  
  

  loadUsers() {
    this.jwtService.getUsers().subscribe(
      (data: any[]) => {
        this.users = data;
  
        if (this.searchStatus === 'active') {
          this.users = this.users.filter(user => user.status);
        } else if (this.searchStatus === 'inactive') {
          this.users = this.users.filter(user => !user.status);
        }
        
        this.totalUsers = this.users.length;
        this.totalPages = Math.ceil(this.totalUsers / this.itemsPerPage);
        this.updatePages();
        this.setPage(1); 
      },
      (error) => {
        console.error('Erreur lors du chargement des utilisateurs :', error);
      }
    );
  }

  sortData(attribute: string) {
    if (this.sortColumn === attribute) {
      this.sortOrder = (this.sortOrder === 'asc') ? 'desc' : 'asc';
    } else {
      this.sortColumn = attribute;
      this.sortOrder = 'asc';
    }
  
    this.users.sort((a, b) => {
      const valueA = a[this.sortColumn];
      const valueB = b[this.sortColumn];
  
      if (valueA < valueB) {
        return this.sortOrder === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  
    this.updatePaginatedUsers();
  }
  



  refreshTable() {
    this.loadUsers();
}
changeRole(userId: string, newRole: string) {
  this.jwtService.updateUser(userId, newRole).subscribe(
    (response) => {
     
        this.loadUsers(); 
    },
    (error) => {
       
        console.error('Erreur lors de la mise à jour du rôle utilisateur :', error);
    }
  );
}
roleOptions = [
  { value: 'USER', label: 'USER' },
  { value: 'ADMIN', label: 'ADMIN' },
  {  value: 'DOCTOR', label: 'DOCTOR' }
 
];

  updatePages() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.updatePaginatedUsers(); 
  }
  
  updatePaginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalUsers);
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }
  

  prevPage() {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }

  navigateToProfile(userId: string) {
    this.router.navigate(['admin/gestionprofile', userId]);
  }



  createChart() {
    this.jwtService.countVerifiedUsers().subscribe(
      count => {
        const ctx = this.myChart.nativeElement.getContext('2d');
        this.chart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Vérifié', 'Non vérifié'],
            datasets: [{
              data: [count*100,100-count*100 ], 
              backgroundColor: [
                '#36A2EB', 
                '#FF6384'  
              ]
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            ...(Chart as any).defaults.pie,
            width: 300,
            height: 300
          } as ChartOptions<'pie'>
        });
      },
      (error: any) => {
        console.error('Erreur lors de la récupération du nombre d\'utilisateurs vérifiés :', error);
      }
    );
  }

  deleteUser(userId: any) {
    this.jwtService.deletuser(userId).subscribe(
      (response) => {
       
        this.loadUsers();
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'utilisateur :', error);
      }
    );
  }

 
  createChart1() {
    this.jwtService.getAgePercentages().subscribe(
      percentages => {
        if (!this.myChart1) {
          return;
        }
        const ctx = this.myChart1.nativeElement.getContext('2d');
    
        const ageGroups = ['Moins de 18 ans', '18-30 ans', 'Plus de 30 ans'];
    
        this.chart1 = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ageGroups,
            datasets: [{
              data: percentages,
              backgroundColor: [
                '#FF6384', 
                '#36A2EB', 
                '#FFCE56'  
              ]
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            ...(Chart as any).defaults.pie,
            width: 300,
            height: 300
          } as ChartOptions<'pie'>
        });
      },
      error => {
        console.error('Erreur lors de la récupération des pourcentages d\'âge :', error);
      }
    );
  }
 

  changeUserRole(userId: string, newRole: string) {
    const userData = { role: newRole };

    this.jwtService.roleUser(userId, userData).subscribe(
        (response) => {
            
         
            this.loadUsers(); 
        },
        (error) => {
         
            console.error('Erreur lors de la mise à jour du rôle utilisateur :', error);
        }
    );
}
  
}
