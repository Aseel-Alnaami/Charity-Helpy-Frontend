import { Component, OnInit } from '@angular/core';
import { HomeService } from '../Services/home.service';
import { AdminService } from '../Services/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userId: string | null = null;
  username: string | null = null;
  fullname: string | null = null;
  roleId: string | null = null;

  ngOnInit() {
    this.getUserInfo();
    this.getLastAddedCharities();
    this.getLastendeddCharities();
     this.loadTestimonials();
     this.GetContactPage();
  }

//   <div *ngIf="userId">
//   <p>User ID: {{ userId }}</p>
//   <p>Username: {{ username }}</p>
//   <p>Fullname: {{ fullname }}</p>
//   <p>Role ID: {{ roleId }}</p>
// </div>
   constructor(private home:HomeService, private admin: AdminService) {}

     homeData: any;

  GetContactPage(){
    this.admin.GetAllHomePage().subscribe(res => {
      this.homeData = res[0]; 
    });
  }


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


  lastCharities: any[] = [];


getLastAddedCharities(count: number = 3) {
  this.home.getAllCharities().subscribe(
    (data: any[]) => {
      const paidCharities = data.filter(c => c.status === 'Paid'&& c.currentdonation < c.target);

      // 2. Sort by created date (latest first)
      const sorted = paidCharities.sort((a, b) =>
        new Date(b.createddate).getTime() - new Date(a.createddate).getTime()
      );

      // 3. Take the most recent N
      this.lastCharities = sorted.slice(0, count);
    },
    (error) => {
      console.error('Error fetching charities:', error);
    }
  );
}

/////////////

lastCharitiesend: any[] = [];


getLastendeddCharities(count: number = 3) {
  this.home.getAllCharities().subscribe(
    (data: any[]) => {
      // 1. Filter by status 'Paid' AND currentdonation equals target
      const paidAndCompleted = data.filter(c => 
        c.status === 'Paid' && c.currentdonation === c.target
      );

      // 2. Sort by created date (latest first)
      const sorted = paidAndCompleted.sort((a, b) =>
        new Date(b.createddate).getTime() - new Date(a.createddate).getTime()
      );

      // 3. Take the most recent N
      this.lastCharitiesend = sorted.slice(0, count);
      // alert("no error");

    },
    (error) => {
      alert("error");
      console.error('Error fetching charities:', error);
    }
  );
}
testimonials: any[] = [];

loadTestimonials(): void {
  this.home.getTestimonialByStatus('Approved').subscribe({
    next: (data) => {
     
      this.testimonials = data.slice(-3);
    },
    error: (err) => {
      console.error('Error loading testimonials:', err);
    }
  });
}



}