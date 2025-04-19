import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  adminData: any = {}; // 🔹 لتخزين بيانات الأدمن
  userId!: number | null; 

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token'); // ✅ جلب التوكن
    if (!token) {
      console.error('No token found!');
      return;
    }

    try {
      const decodedToken: any = JSON.parse(atob(token.split('.')[1])); // ✅ فك تشفير التوكن
      const username = decodedToken?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]; // ✅ استخراج الـ name

      if (!username) {
        console.error('Username not found in token!');
        return;
      }

      console.log('Extracted Username:', username);

      this.userService.getUserByUsername(username).subscribe(
        (user: any) => {
          if (user && user.userid) {
            this.userId = user.userid; 
            this.adminData = user; 
            console.log('Admin Data:', this.adminData);
          } else {
            console.error('Admin not found!');
          }
        },
        (error) => {
          console.error('Error fetching admin data:', error);
        }
      );

    } catch (error) {
      console.error('Invalid token format:', error);
    }
  }


  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }
}
