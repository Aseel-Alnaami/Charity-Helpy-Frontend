import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { AdminSidebarComponent } from '../admin/admin-sidebar/admin-sidebar.component';
import { AdminFooterComponent } from '../admin/admin-footer/admin-footer.component';
import { AdminNavbarComponent } from '../admin/admin-navbar/admin-navbar.component';
import { AboutsectionComponent } from './aboutsection/aboutsection.component';


@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    AdminNavbarComponent,
    AdminSidebarComponent,
    AdminFooterComponent,
    AboutsectionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    AdminNavbarComponent,
    AdminSidebarComponent,
    AdminFooterComponent,
    AboutsectionComponent
  ]
})
export class ShearedModule { } 
