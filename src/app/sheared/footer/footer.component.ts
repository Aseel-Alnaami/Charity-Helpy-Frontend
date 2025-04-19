import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{

  constructor(private admin: AdminService) {}
  
  ngOnInit(): void {
    this.GetContactPage();
  }

  contactData: any;

  GetContactPage(){
    this.admin.GetAllContactPage().subscribe(res => {
      this.contactData = res[0]; 
    });
  }

}
