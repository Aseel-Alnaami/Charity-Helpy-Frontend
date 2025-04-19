import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ShearedModule } from '../sheared/sheared.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { CreaeRoleComponent } from './creae-role/creae-role.component';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';
import { SentContactComponent } from './sent-contact/sent-contact.component';
import { PindingContactComponent } from './pinding-contact/pinding-contact.component';
import { ManageInvoiceComponent } from './manage-invoice/manage-invoice.component';
import { ManageContactusComponent } from './manage-contactus/manage-contactus.component';
import { ManageCharitiesComponent } from './manage-charities/manage-charities.component';
import { CreateCharityComponent } from './create-charity/create-charity.component';
import { ManageProblemsComponent } from './manage-problems/manage-problems.component';
import { ProfileComponent } from './profile/profile.component';
// import { CreateUserComponent } from './create-user/create-user.component';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { NgChartsModule } from 'ng2-charts';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FAQPageComponent } from './faqpage/faqpage.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ManageDonationsComponent } from './manage-donations/manage-donations.component';
import { ManageTestimonialsComponent } from './manage-testimonials/manage-testimonials.component';
import { AlltestimonialsComponent } from './alltestimonials/alltestimonials.component';





// in the sane moudule
@NgModule({
  declarations: [
    DashboardComponent,
    // AdminNavbarComponent,
    // AdminFooterComponent,
    // AdminSidebarComponent,
    ManageUsersComponent,
    CreateUserComponent,
    ManageCategoryComponent,
    CreaeRoleComponent,
    ManageRolesComponent,
    SentContactComponent,
    PindingContactComponent,
    ManageInvoiceComponent,
    ManageContactusComponent,
    ManageCharitiesComponent,
    CreateCharityComponent,
    ManageProblemsComponent,
    ProfileComponent,
    AdminLayoutComponent,
    ContactPageComponent,
    HomePageComponent,
    FAQPageComponent,
    AboutPageComponent,
    ManageDonationsComponent,
    ManageTestimonialsComponent,
    AlltestimonialsComponent        
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ShearedModule,
    NgChartsModule
    ],
    exports: [
      AdminLayoutComponent,
      CreateCharityComponent
    ]
})
export class AdminModule { }
