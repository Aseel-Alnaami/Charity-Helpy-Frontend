import { Component } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AuthService } from 'src/app/Services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent {
  private fixedInvoice: any;

  constructor(private userService: UserService,private authService: AuthService,private http: HttpClient) {}

  createInvoice() {
    this.fixedInvoice = {
      userid: 2,
      charityid: '4',
      amount: 40,
      type: 'Charity',
      invoicedate: new Date().toISOString().split('T')[0]  // Current date
    };

    this.userService.createInvoice(this.fixedInvoice);
    alert('Invoice created successfully!'); // Optional: Notify user
  }

 

  
  sendInvoiceByEmail() {
    this.http.post(`https://localhost:7140/api/Invoice/SendInvoiceEmail`, this.invoice).subscribe({
      next: () => alert("Invoice sent to your email successfully!"),
      error: (err) => {
        console.error("Failed to send invoice", err);
        alert("Failed to send invoice by email.");
      }
    });
  }

  invoice: any;

  generatePDF() {
    const doc = new jsPDF();
  
    doc.setFontSize(18);
    doc.text('Charity Invoice', 14, 22);
  
    doc.setFontSize(12);
    doc.text(`Invoice Date: ${this.invoice.invoiceDate}`, 14, 32);
   
  
    autoTable(doc, {
      startY: 50,
      head: [['Field', 'Value']],
      body: [
        ['Full Name', this.invoice.fullName],
        ['Charity Name', this.invoice.charityName],
        ['Amount', `$${this.invoice.amount.toFixed(2)}`],
        ['Type', this.invoice.type]
      ]
    });
  
    doc.save('invoice.pdf');
  }
  
  

  getLatestInvoice() {
    const userId = localStorage.getItem('userid');
    if (!userId) {
      alert("User ID not found in localStorage");
      return;
    }
  
    this.userService.getLatestInvoice().subscribe({
      next: (data) => {
        this.invoice = data;
        console.log("Latest Invoice:", this.invoice);
        alert('Invoice loaded successfully!');
      },
      error: (err) => {
        console.error("Failed to load invoice", err);
        alert('Failed to load invoice');
      }
    });
  }
}