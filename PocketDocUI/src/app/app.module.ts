import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { HeaderFrontComponent } from './FrontOffice/header-front/header-front.component';
import { FooterFrontComponent } from './FrontOffice/footer-front/footer-front.component';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { NavbarBackComponent } from './BackOffice/navbar-back/navbar-back.component';
import { SidebarBackComponent } from './BackOffice/sidebar-back/sidebar-back.component';
import { ListEventComponent } from './BackOffice/list-event/list-event.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';
import { ResetPasswordEmailComponent } from './auth/components/reset-password-email/reset-password-email.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdddiplomeComponent } from './auth/components/adddiplome/adddiplome.component';
import { ProfileComponent } from './BackOffice/profile/profile.component';
import { EditprofileComponent } from './BackOffice/editprofile/editprofile.component';
import { ProfilComponent } from './FrontOffice/profil/profil.component';
import { EditprofilComponent } from './FrontOffice/editprofil/editprofil.component';
import { UsersComponent } from './BackOffice/users/users.component';
import { GestionprofileComponent } from './BackOffice/gestionprofile/gestionprofile.component';
import { JwtDecodeModule } from './jwt-decode/jwt-decode.module';
import { CalenderComponent } from './rdv/calender/calender.component';
import { CalenderDoctorComponent } from './rdv/calender-doctor/calender-doctor.component';
import { ConsultationsStatComponent } from './rdv/consultations-stat/consultations-stat.component';
import { ListDoctorComponent } from './rdv/list-doctor/list-doctor.component';
import { ListReclamationComponent } from './BackOffice/liste-reclamation/liste-reclamation.component';
import { AjouterreclamationComponent } from './FrontOffice/ajouterreclamation/ajouterreclamation.component';
import { ReclamationDetailsComponent } from './BackOffice/reclamation-details/reclamation-details.component';

import { MatCardModule } from '@angular/material/card';
import { FullCalendarModule } from '@fullcalendar/angular';

import { MatPaginatorModule } from '@angular/material/paginator';
import { ConsultationChartComponentComponent } from './rdv/consultation-chart-component/consultation-chart-component.component';
import { ConsultationsDashboardComponent } from './rdv/consultations-dashboard/consultations-dashboard.component';
import { DashboardComponent } from './BackOffice/dashboard/dashboard.component';
import { AllPublicationComponent } from './FrontOffice/all-publication/all-publication.component';
import { PostPublicationComponent } from './FrontOffice/post-publication/post-publication.component';
import { UpdatePublicationComponent } from './FrontOffice/update-publication/update-publication.component';
import { PostCommentaireComponent } from './FrontOffice/post-commentaire/post-commentaire.component';
import { UpdateCommentComponent } from './FrontOffice/update-comment/update-comment.component';
import { PublicationComponent } from './BackOffice/publication/publication.component';

import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { ListInscriByuserComponent } from './FrontOffice/Event/list-inscri-byuser/list-inscri-byuser.component';
import { ListEventFrontComponent } from './FrontOffice/Event/list-event-front/list-event-front.component';
import { MapViewComponent } from './FrontOffice/Event/map-view/map-view.component';
import { AddEventComponent } from './BackOffice/Event/add-event/add-event.component';
import { ListEventBackComponent } from './BackOffice/Event/list-event-back/list-event-back.component';
import { ModEventComponent } from './BackOffice/Event/mod-event/mod-event.component';
import { StatEventComponent } from './BackOffice/Event/stat-event/stat-event.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AffiGeminiComponent } from './oumC/affi-gemini/affi-gemini.component';
import { AllFilesComponent } from './oumC/conventions/all-files/all-files.component';
import { Convention } from './oumC/entities/Convention';
import { ConventionComponent } from './oumC/conventions/convention/convention.component';
import { DemandeComponent } from './oumC/conventions/demande/demande.component';
import { UploadFileComponent } from './oumC/conventions/upload-file/upload-file.component';
import { NosfichesComponent } from './oumC/nosfiches/nosfiches.component';
import { RComponent } from './oumC/r/r.component';
import { StatisticsComponent } from './oumC/statistics/statistics.component';
import { SympComponent } from './oumC/symptom/symp/symp.component';
import { SympDocComponent } from './oumC/symptom/symp-doc/symp-doc.component';
import { ConvBackComponent } from './BackOffice/conv-back/conv-back.component';
import { DemBackComponent } from './BackOffice/dem-back/dem-back.component';
import { ModalContentComponent } from './oumC/modal-content/modal-content.component';


@NgModule({
  declarations: [
    AppComponent,
    AllTemplateFrontComponent,
    HeaderFrontComponent,
    FooterFrontComponent,
    AllTemplateBackComponent,
    NavbarBackComponent,
    SidebarBackComponent,
    ListEventComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ResetPasswordEmailComponent,
    AdddiplomeComponent,
    ProfileComponent,
    EditprofileComponent,
    ProfilComponent,
    EditprofilComponent,
    UsersComponent,
    GestionprofileComponent,
    CalenderComponent,
    CalenderDoctorComponent,
    ConsultationsStatComponent,
    ListDoctorComponent,
    ConsultationChartComponentComponent,
    ConsultationsDashboardComponent,
    ListReclamationComponent,
    AjouterreclamationComponent,
    ReclamationDetailsComponent,
    DashboardComponent,
    AllPublicationComponent,
    PostPublicationComponent,
    UpdatePublicationComponent,
    PostCommentaireComponent,
    UpdateCommentComponent,
    PublicationComponent,
    ListInscriByuserComponent,
    ListEventFrontComponent,
    MapViewComponent,
    AddEventComponent,
    ListEventBackComponent,
    ModEventComponent,
    StatEventComponent,
    AffiGeminiComponent,
    AllFilesComponent,
    ConventionComponent,
    DemandeComponent,
    UploadFileComponent,
    NosfichesComponent,
    RComponent,
    StatisticsComponent,
    SympComponent,
    SympDocComponent,
    ConvBackComponent,
    DemBackComponent,
    ModalContentComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    JwtDecodeModule,
    MatCardModule,
    FullCalendarModule,
    MatPaginatorModule,
    NgApexchartsModule,
    
    BrowserAnimationsModule,
    NgbModule,
    NgbPaginationModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSortModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
