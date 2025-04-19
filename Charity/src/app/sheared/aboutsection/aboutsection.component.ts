import { Component } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-aboutsection',
  templateUrl: './aboutsection.component.html',
  styleUrls: ['./aboutsection.component.css']
})
export class AboutsectionComponent {
 about: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAboutPage();

  }

  getAboutPage(): void {
    this.adminService.GetAboutPage().subscribe({
      next: (data: any) => {
        this.about = [data];


      },
      error: (err: any) => {
        console.error('Failed to load About page:', err);
      }
    });
  }
}