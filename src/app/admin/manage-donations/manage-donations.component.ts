import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-manage-donations',
  templateUrl: './manage-donations.component.html',
  styleUrls: ['./manage-donations.component.css']
})
export class ManageDonationsComponent implements OnInit {
  donations: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAllDonations();
  }

  getAllDonations(): void {
    this.adminService.getAllDonations().subscribe(
      (data) => {
        this.donations = data;
      }
    );
  }

  deleteDonation(id: number): void {
    if (confirm('Are you sure you want to delete this donation?')) {
      this.adminService.deleteDonation(id).subscribe(
        () => {
          this.getAllDonations();
        }
      );
    }
  }
}