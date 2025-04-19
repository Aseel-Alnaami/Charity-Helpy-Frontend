import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-manage-invoice',
  templateUrl: './manage-invoice.component.html',
  styleUrls: ['./manage-invoice.component.css']
})


export class ManageInvoiceComponent implements OnInit {
  ngOnInit(): void {
    this.admin.getallInvoices();

  }

  constructor(public admin: AdminService) { }
}