import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { ListEventComponent } from './BackOffice/list-event/list-event.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';
import { ResetPasswordEmailComponent } from './auth/components/reset-password-email/reset-password-email.component';
import { AdddiplomeComponent } from './auth/components/adddiplome/adddiplome.component';
import { ProfileComponent } from './BackOffice/profile/profile.component';
import { EditprofileComponent } from './BackOffice/editprofile/editprofile.component';
import { ProfilComponent } from './FrontOffice/profil/profil.component';
import { EditprofilComponent } from './FrontOffice/editprofil/editprofil.component';
import { UsersComponent } from './BackOffice/users/users.component';
import { GestionprofileComponent } from './BackOffice/gestionprofile/gestionprofile.component';
import { RoleGuardService } from './auth/service/role-guard.service';
import { CalenderComponent } from './rdv/calender/calender.component';
import { ListDoctorComponent } from './rdv/list-doctor/list-doctor.component';
import { CalenderDoctorComponent } from './rdv/calender-doctor/calender-doctor.component';
import { ConsultationsStatComponent } from './rdv/consultations-stat/consultations-stat.component';
import { ConsultationChartComponentComponent } from './rdv/consultation-chart-component/consultation-chart-component.component';
import { ConsultationsDashboardComponent } from './rdv/consultations-dashboard/consultations-dashboard.component';
import { ListReclamationComponent } from './BackOffice/liste-reclamation/liste-reclamation.component';
import { ReclamationDetailsComponent } from './BackOffice/reclamation-details/reclamation-details.component';
import { AjouterreclamationComponent } from './FrontOffice/ajouterreclamation/ajouterreclamation.component';
import { DashboardComponent } from './BackOffice/dashboard/dashboard.component';
import { AllPublicationComponent } from './FrontOffice/all-publication/all-publication.component';
import { PostPublicationComponent } from './FrontOffice/post-publication/post-publication.component';
import { UpdatePublicationComponent } from './FrontOffice/update-publication/update-publication.component';
import { PostCommentaireComponent } from './FrontOffice/post-commentaire/post-commentaire.component';
import { PublicationComponent } from './BackOffice/publication/publication.component';
import { AddEventComponent } from './BackOffice/Event/add-event/add-event.component';
import { ModEventComponent } from './BackOffice/Event/mod-event/mod-event.component';
import { ListEventBackComponent } from './BackOffice/Event/list-event-back/list-event-back.component';
import { StatEventComponent } from './BackOffice/Event/stat-event/stat-event.component';
import { ListEventFrontComponent } from './FrontOffice/Event/list-event-front/list-event-front.component';
import { ListInscriByuserComponent } from './FrontOffice/Event/list-inscri-byuser/list-inscri-byuser.component';
import { ConventionComponent } from './oumC/conventions/convention/convention.component';
import { AffiGeminiComponent } from './oumC/affi-gemini/affi-gemini.component';
import { NosfichesComponent } from './oumC/nosfiches/nosfiches.component';
import { SympComponent } from './oumC/symptom/symp/symp.component';
import { SympDocComponent } from './oumC/symptom/symp-doc/symp-doc.component';
import { RComponent } from './oumC/r/r.component';
import { DemBackComponent } from './BackOffice/dem-back/dem-back.component';
import { ConvBackComponent } from './BackOffice/conv-back/conv-back.component';
import { StatisticsComponent } from './oumC/statistics/statistics.component';
import { DemandeComponent } from './oumC/conventions/demande/demande.component';

const routes: Routes = [
  {
    path: '',
    component: AllTemplateFrontComponent,
    canActivate: [RoleGuardService], // Utilisez le garde de routage ici
    data: {
      expectedRoles: ['USER', 'DOCTOR'], // Spécifiez le rôle attendu pour accéder à cette route
    },
    children: [
      { path: 'profile', component: ProfilComponent },
      { path: 'editProfil', component: EditprofilComponent },
      { path: 'calender/:id', component: CalenderComponent },

      { path: 'list', component: ListDoctorComponent },
      { path: 'calenderdoc', component: CalenderDoctorComponent },
      { path: 'stat', component: ConsultationsStatComponent },
      { path: 'stat2', component: ConsultationsDashboardComponent },
      { path: 'reclamation', component: AjouterreclamationComponent },
      { path: "pub", component: AllPublicationComponent },
    { path: "publication", component: PostPublicationComponent },
    { path: "publication/:id", component: UpdatePublicationComponent },
    { path: 'publication/:id/comment', component: PostCommentaireComponent },

    { path :"events", component:ListEventFrontComponent},
    { path :"listInscri",component:ListInscriByuserComponent},
    { path :"convention", component : ConventionComponent},
    { path :"ask", component :AffiGeminiComponent},
    { path :"fiches", component :NosfichesComponent},
    {path :"URGENTcase", component :SympComponent},
    {path :"docURGENT", component :SympDocComponent},
    {path :"RENEWedConvention", component :RComponent},
    { path :"demande", component: DemandeComponent}
    ],
  },

  {
    path: 'admin',
    component: AllTemplateBackComponent,
    canActivate: [RoleGuardService], // Utilisez le garde de routage ici
    data: {
      expectedRoles: ['ADMIN'], // Spécifiez le rôle attendu pour accéder à cette route
    },
    children: [
      { path: 'event', component: ListEventComponent },
      { path: 'profil', component: ProfileComponent },
      { path: 'editProfile', component: EditprofileComponent },
      { path: 'users', component: UsersComponent },
      { path: 'gestionprofile/:id', component: GestionprofileComponent },
      { path: 'reclamation', component: ListReclamationComponent },
      { path: 'reclamation/:idRec', component: ReclamationDetailsComponent }, // Define route for claim details component
      { path: 'dashboard', component: DashboardComponent },
      { path: "allpublication", component: PublicationComponent },

      { path:"ajouter",component:AddEventComponent},
      { path:"modif/:id",component:ModEventComponent},
      { path:"listEvent",component:ListEventBackComponent},
      { path:"statEvent",component:StatEventComponent},
      { path :"gestionprofile/:id", component:  GestionprofileComponent},
      { path:"demback",component:DemBackComponent},
      { path:"convback",component:ConvBackComponent},
      { path:"stats",component:StatisticsComponent}

    ],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'reset-password-email', component: ResetPasswordEmailComponent },
  { path: 'adddiplome', component: AdddiplomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
