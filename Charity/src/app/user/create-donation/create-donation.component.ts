import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';


@Component({
  selector: 'app-create-donation',
  templateUrl: './create-donation.component.html',
  styleUrls: ['./create-donation.component.css']
})
export class CreateDonationComponent {
  cardNumber: string = '';
  cvvNumber: string = '';
  email: string = '';
  charityId!: number;
  userId!: number;
  balance: number = 0; // القيمة النهائية اللي بتُرسل
  customAmount: number = 0; // يخزن المبلغ المخصص لو المستخدم أدخله


  constructor(private userService: UserService,private router: Router) {}


  ngOnInit(): void {
    const storedCharityId = localStorage.getItem('charityId');
    const storedUserId = localStorage.getItem('userid');
  
    this.charityId = storedCharityId ? +storedCharityId : 0;
    this.userId = storedUserId ? +storedUserId : 0;

  
  }
 

  selectAmount(amount: number) {
    this.balance = amount;
  }

  // //amount=this.balance ;
  newdonate() {
    const donationData = {
      amount: this.balance,
      userid: this.userId,
      charityid: this.charityId
    };
  }

 
  VisaPayment() 
  {  
    const paymentData = {
      cardNumber: this.cardNumber,
      cvvNumber: this.cvvNumber,
      amount: this.balance
    };
    debugger ;
    this.userService.VisaPayment(paymentData).subscribe(
      (data) => {
        console.log('Payment successful', data);
         
        // الخطوة 1: تحديث التبرع في Charity
        this.userService.currentdonate(this.charityId, this.balance).subscribe(
          () => {
            console.log('current donation was updated');
  
            // الخطوة 2: إنشاء سجل تبرع رسمي
            const donationData = {
              amount: this.balance,
              userid: this.userId,
              charityid: this.charityId
            };

            
            this.userService.createDonation(donationData).subscribe(
              (res) => {
                console.log('Donation sent successfully!', res);
                alert('Thank You For Donation !');


                const invoiceData = {
                  userid: this.userId,
                  charityid: this.charityId,
                  amount: this.balance,
                  type: 'Donation'
                };
                 
                console.log('Invoice data:', invoiceData);  // تأكد من قيم البيانات

                debugger ;
                this.userService.createDonationInvoice(invoiceData).subscribe(
                  (res) => {
                    console.log('Invoice created successfully!',res);
                    
                    debugger ;
                this.userService.getDonationLatestInvoice().subscribe(
                  (invoice) => {
                    console.log('Latest Invoice Object:', invoice);
                    this.userService.sendInvoiceEmail(invoice).subscribe(
                      () => {
                        alert('Donation Invoice sent to Your email !');
                      },
                      (err) => console.error('Failed to send invoice', err)
                    );
                  },
                  (err) => console.error('Failed to get invoice', err)
                );
              },
              (err) => {
                console.error('Donation failed', err);
              }
            );
          },
          (error) => {
            console.error('current donation not updated', error);
          }
        );
      },
      (error: any) => {
        console.error('Payment failed', error);
      }
    );
  }
  

    )}}