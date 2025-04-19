import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-testimonial',
  templateUrl: './create-testimonial.component.html',
  styleUrls: ['./create-testimonial.component.css']
})
export class CreateTestimonialComponent {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private dialogRef: MatDialogRef<CreateTestimonialComponent>

  ) {}
  testimonialForm!: FormGroup;
  isSubmitting: boolean = false;
  userId: number | null = null;  // We will store the user ID here
  ngOnInit(): void {
    this.initForm();
    this.loadUserIdFromLocalStorage();  // Load userId from localStorage

  }
  
  private loadUserIdFromLocalStorage(): void {
    const storedUserId = localStorage.getItem('userid');  // Retrieve from localStorage
    if (storedUserId) {
      this.userId = Number(storedUserId);  // Convert to number and assign
    }
  }
  private initForm(): void {
    this.testimonialForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(1)]],
      rating: [0, [Validators.required]],
    });
  }
  onRatingChanged(rating: number): void {
    this.testimonialForm.patchValue({ rating: rating });
  }

  submitTestimonial(): void {
    if (this.testimonialForm.invalid) {
      this.testimonialForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const testimonialData = {
      userid: this.userId,  
      content: this.testimonialForm.value.content,
      rating: this.testimonialForm.value.rating
    };

    this.userService.createTestimonial(testimonialData).subscribe({
      next: () => {
        alert('Testimonial created successfully!');
        this.router.navigate(['/profile']);
        this.dialogRef.close(); 

      },
      error: (err) => {
        console.error('Error creating testimonial:', err);
        alert('Failed to submit testimonial. Please try again.');
      },
      complete: () => {
        this.isSubmitting = false;
        this.testimonialForm.reset();
      }
    });

    
  }
}