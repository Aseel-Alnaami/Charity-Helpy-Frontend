import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { SentContactComponent } from './sent-contact/sent-contact.component';
import { PindingContactComponent } from './pinding-contact/pinding-contact.component';
import { ManageContactusComponent } from './manage-contactus/manage-contactus.component';
import { ManageInvoiceComponent } from './manage-invoice/manage-invoice.component';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';
import { CreaeRoleComponent } from './creae-role/creae-role.component';
import { ManageCharitiesComponent } from './manage-charities/manage-charities.component';
import { ManageProblemsComponent } from './manage-problems/manage-problems.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FAQPageComponent } from './faqpage/faqpage.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ManageDonationsComponent } from './manage-donations/manage-donations.component';
import { ManageTestimonialsComponent } from './manage-testimonials/manage-testimonials.component';

const routes: Routes = [

  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'sidebar',
    component: AdminSidebarComponent
  },
  {
    path: 'footer',
    component: AdminFooterComponent
  },
  {
    path: 'navbar',
    component: AdminNavbarComponent
  },
  {
    path: 'userinfo',
    component: ManageUsersComponent
  }, 
  {
    path: 'category',
    component: ManageCategoryComponent
  }, 
  {
    path: 'sentcontact',
    component: SentContactComponent
  },
  {
    path: 'pindingcontact',
    component: PindingContactComponent
  },
  {
    path: 'creatrole',
    component: CreaeRoleComponent
  },
  {
    path: 'managecontact',
    component: ManageContactusComponent
  },
  {
    path: 'manageinvoice',
    component: ManageInvoiceComponent
  },
  {
    path: 'manageroles',
    component: ManageRolesComponent
  }, {
    path: 'managecharity',
    component: ManageCharitiesComponent
  },
  {
    path: 'manageProblem',
    component: ManageProblemsComponent
  }, {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'contactpage',
    component: ContactPageComponent
  },
  {
    path: 'homepage',
    component: HomePageComponent
  },
  {
    path: 'faqsection',
    component: FAQPageComponent
  },
  {
    path: 'aboutpage',
    component: AboutPageComponent
  },
  {
    path: 'donations',
    component: ManageDonationsComponent
  },
  {
    path: 'testimonials',
    component: ManageTestimonialsComponent
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
