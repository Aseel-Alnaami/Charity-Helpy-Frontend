import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-pay-donation',
  templateUrl: './pay-donation.component.html',
  styleUrls: ['./pay-donation.component.css']
})
export class PayDonationComponent implements OnInit {

  donations: any[] = [];
  userId!: number;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // Get userId from local storage
    const userIdFromStorage = localStorage.getItem('userid');
    if (userIdFromStorage) {
      this.userId = +userIdFromStorage; // Convert the string to a number
      this.loadDonations();
    } else {
      console.error('User ID not found in local storage');
      // Handle error: redirect or show an error message
    }
  }

  loadDonations() {
    this.userService.getDonationsByUserId().subscribe(
      (data) => {
        this.donations = data;
      },
      (error) => {
        console.error('Error loading donations:', error);
      }
    );
  }
}
