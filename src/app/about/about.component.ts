import { Component, EventEmitter, Output } from '@angular/core';
import { AdminService } from '../Services/admin.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
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
