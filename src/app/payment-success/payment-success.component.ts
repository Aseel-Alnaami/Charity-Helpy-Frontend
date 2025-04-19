// import { Component } from '@angular/core';


import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {

  invoiceData: any = null;

  constructor(private userService: UserService ,private router: Router) {}

  ngOnInit(): void {
    const userid = localStorage.getItem('userid');
    const charityid = localStorage.getItem('charityid');
    const amount = localStorage.getItem('amount');

    if (userid && charityid && amount) {
      const invoice = {
        userid,
        charityid,
        amount,
        type: 'Charity',
        invoicedate: new Date().toISOString().split('T')[0]
      };

      this.userService.createInvoice(invoice).subscribe({
        next: (res) => {
          alert('✅ Invoice created successfully!');
          this.invoiceData = res; 
        },
        error: err => console.error('❌ Failed to create invoice:', err)
      });

      // Clear storage
      localStorage.removeItem('charityid');
      localStorage.removeItem('amount');

      this.router.navigate(['/user/create-user']);
    } else {
      console.error('Missing data for invoice creation');
    }
  }
}