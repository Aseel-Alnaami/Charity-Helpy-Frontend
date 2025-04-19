import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-manage-testimonials',
  templateUrl: './manage-testimonials.component.html',
  styleUrls: ['./manage-testimonials.component.css']
})
export class ManageTestimonialsComponent implements OnInit {
  testimonials: any[] = [];
  isLoading = false;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadTestimonials();
  }

  loadTestimonials(): void {
    this.isLoading = true;
    this.adminService.getTestimonialByStatus('Pending').subscribe({
      next: (data) => {
        this.testimonials = data;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  deleteTestimonial(id: number): void {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      this.adminService.deleteTestimonial(id).subscribe({
        next: () => {
          this.testimonials = this.testimonials.filter(t => t.testimonialid !== id);
          alert('Testimonial deleted.');
        }
      });
    }
  }

  approveTestimonial(id: number): void {
    if (confirm('Are you sure you want to approve this testimonial?')){
      this.adminService.approveTestimonial(id).subscribe({
        next: () => {
          this.testimonials = this.testimonials.filter(t => t.testimonialid !== id);
          alert('Testimonial approved.');
        }
      });
    }
  }
}

