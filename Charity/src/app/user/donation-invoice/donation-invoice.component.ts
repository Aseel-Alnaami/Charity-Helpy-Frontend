import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-donation-invoice',
  templateUrl: './donation-invoice.component.html',
  styleUrls: ['./donation-invoice.component.css']
})
export class DonationInvoiceComponent {

  userId!: number;
  charityId!: number;
  amount!: number;
  type: string = 'Donation';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userid');
    const storedCharityId = localStorage.getItem('charityId');
    const storedAmount = localStorage.getItem('donationAmount');

    if (storedUserId && storedCharityId && storedAmount) {
      this.userId = +storedUserId;
      this.charityId = +storedCharityId;
      this.amount = +storedAmount;

      this.sendInvoice(); // ترسل الفاتورة عند فتح الصفحة
    } else {
      console.error('Missing data in localStorage');
    }
  }

  sendInvoice() {
    const invoiceData = {
      userid: this.userId,
      charityid: this.charityId,
      amount: this.amount,
      type: this.type
    };

    this.userService.createDonationInvoice(invoiceData).subscribe(
      res => {
        console.log('Invoice sent successfully!', res);
        alert('Invoice Created Successfully ✅');
      },
      err => {
        console.error('Invoice creation failed', err);
      }
    );
  }
}
