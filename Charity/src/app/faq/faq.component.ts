import { Component, OnInit } from '@angular/core';
import { AdminService } from '../Services/admin.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FAQComponent implements OnInit{
  constructor(private admin: AdminService) {}
  
  ngOnInit(): void {
    this.GetFAQPage();
  }

  FAQData: any;
  Math = Math;

  GetFAQPage(){
    this.admin.GetAllFAQPage().subscribe(res => {
      this.FAQData = res; 
    });
  }

}
