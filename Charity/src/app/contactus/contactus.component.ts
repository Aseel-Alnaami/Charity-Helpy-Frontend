import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../Services/home.service'; // Adjust the path as necessary
import { AdminService } from '../Services/admin.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private homeService: HomeService, private admin: AdminService, private sanitizer: DomSanitizer) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],

      message: ['', Validators.required]

    });
  }

  ngOnInit(): void {
    this.GetContactPage();
  }

  contactData: any;
  mapUrl: SafeResourceUrl | null = null;

  GetContactPage(){
    this.admin.GetAllContactPage().subscribe(res => {
      this.contactData = res[0]; 
      const location = this.contactData.location;
      
      const rawUrl = `https://www.google.com/maps?q=${encodeURIComponent(location)}&hl=en&output=embed`;

      // بنعمله safe عشان Angular يسمح باستخدامه
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
    });
  }

  sendContact() {
    if (this.contactForm.valid) {
      // Create a new object that includes the form values and the default status
      const contactData = {
        ...this.contactForm.value, // Spread the form values
        status: 'Pending' // Add the default status
      };

      this.homeService.sendContact(contactData).subscribe(
        (resp: any) => {
          alert('Created Successfully');
          this.contactForm.reset(); // Reset the form
        },
        err => {
          alert('Something went wrong');
        }
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }
}