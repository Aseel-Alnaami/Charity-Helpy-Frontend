import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProblemComponent } from './problem/problem.component';
import { ProfileComponent } from './profile/profile.component';
import { MapComponent } from './map/map.component';
import { PayCharityComponent } from './pay-charity/pay-charity.component';
import { CreateDonationComponent } from './create-donation/create-donation.component';
import { PayDonationComponent } from './pay-donation/pay-donation.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { PaymentSuccessComponent } from '../payment-success/payment-success.component';

const routes: Routes = [
  {
    path: 'Problem',
    component: ProblemComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'map',
    component: MapComponent
  },
  {
    path:'paycharity',
    component:PayCharityComponent
  },
  {
    path:'creatdonation',
    component:CreateDonationComponent
  },
  {
    path:'paydonation',
    component:PayDonationComponent
  },
  {
    path:'createinvoice',
    component: CreateInvoiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
