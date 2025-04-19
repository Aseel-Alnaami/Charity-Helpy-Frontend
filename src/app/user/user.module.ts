import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { CreateProblemComponent } from './create-problem/create-problem.component';
import { ShearedModule } from '../sheared/sheared.module';
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatDialogModule } from '@angular/material/dialog';
import { ProblemComponent } from './problem/problem.component';
import { ProfileComponent } from './profile/profile.component';
import { MapComponent } from './map/map.component';
import { CreateCharityComponent } from '../admin/create-charity/create-charity.component';
import { AdminModule } from '../admin/admin.module';
import { CreateTestimonialComponent } from './create-testimonial/create-testimonial.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { CreateDonationComponent } from './create-donation/create-donation.component';
import { DonationInvoiceComponent } from './donation-invoice/donation-invoice.component';
import { PayCharityComponent } from './pay-charity/pay-charity.component';
import { PayDonationComponent } from './pay-donation/pay-donation.component';

@NgModule({
  declarations: [
    CreateProblemComponent,
    ProblemComponent,
    ProfileComponent,
    MapComponent,
    CreateTestimonialComponent,
    StarRatingComponent,
    CreateInvoiceComponent,
    CreateDonationComponent,
    DonationInvoiceComponent,
    PayCharityComponent,
    PayDonationComponent
   ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ShearedModule,
    ReactiveFormsModule,
    // MatDialogModule,
    AdminModule
  ],
  exports: [
    MapComponent,
    CreateInvoiceComponent
  ]
})
export class UserModule { }