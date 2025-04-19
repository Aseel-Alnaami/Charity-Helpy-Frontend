import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {

  // ✅ Declare the 'about' property
  about: any[] = [];
  selectedAboutItem: any = null;

  openUpdateDialog(item: any) {
    this.selectedAboutItem = { ...item }; // create a copy for editing
  }
  
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAboutPage();
  }

  getAboutPage(): void {
    this.adminService.GetAboutPage().subscribe({
      next: (data: any) => {
        this.about = [data]; // Wrap in array to use *ngFor
      },
      error: (err: any) => {
        console.error('Failed to load About page:', err);
      }
    });
  }

  updateAboutPage(): void {
    this.adminService.UpdateAboutPage(this.selectedAboutItem).subscribe({
      next: () => {
        console.log("Updated");
        this.getAboutPage(); 
        this.selectedAboutItem = null; 
      },
      error: (err) => {
        console.error("Something went wrong!", err);
      }
    });
  }
  

  
  onHeroImgSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
  
    const file = input.files[0];
    const formData = new FormData();
    formData.append('file', file, file.name);
  
    this.adminService.UploadaboutsImage(formData).subscribe({
      next: (response: any) => {
        console.log("Hero image uploaded:", response);
        this.selectedAboutItem.heroImg = response.imagename;
      },
      error: (err) => {
        console.error("Error uploading hero image:", err);
      }
    });
  }
  
  onMissionImgSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
  
    const file = input.files[0];
    const formData = new FormData();
    formData.append('file', file, file.name);
  
    this.adminService.UploadaboutsImage(formData).subscribe({
      next: (response: any) => {
        console.log("Mission image uploaded:", response);
        this.selectedAboutItem.missionImg = response.imagename;
      },
      error: (err) => {
        console.error("Error uploading mission image:", err);
      }
    });
  }
  

}
