import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit {

  constructor(private admin: AdminService) {}

  userId: string | null = null;
  username: string | null = null;
  fullname: string | null = null;
  roleId: string | null = null;

  ngOnInit() {
    this.getUserInfo();
    this.GetContactPage();
  }

    contactData: any;

  GetContactPage(){
    this.admin.GetAllContactPage().subscribe(res => {
      this.contactData = res[0]; 
    });
  }

//   <div *ngIf="userId">
//   <p>User ID: {{ userId }}</p>
//   <p>Username: {{ username }}</p>
//   <p>Fullname: {{ fullname }}</p>
//   <p>Role ID: {{ roleId }}</p>
// </div>


  getUserInfo() {
    this.userId = localStorage.getItem('userid');
    this.username = localStorage.getItem('username');
    this.fullname = localStorage.getItem('Fullname');
    this.roleId = localStorage.getItem('roleid');

    console.log('User info fetched from localStorage:', {
      userId: this.userId,
      username: this.username,
      fullname: this.fullname,
      roleId: this.roleId
    });
  }

  logout() {
    localStorage.clear(); 
    // this.router.navigate(['/login']);
  }

}
