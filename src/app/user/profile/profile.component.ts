import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CreateCharityComponent } from 'src/app/admin/create-charity/create-charity.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentService } from 'src/app/Services/payment.service';
import { CreateTestimonialComponent } from '../create-testimonial/create-testimonial.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // userId: number = 5; 
  userId!: number | null; // متغير بدون قيمة افتراضية

  userId1: string | null = null;
  username: string | null = null;
  fullname: string | null = null;
  roleId: string | null = null;
  updateForm!: FormGroup; 

  constructor(private userService: UserService, private dialog: MatDialog, private router: Router,private paymentService: PaymentService) {}

  
  ngOnInit() {
    this.getUserInfo();

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
  
      // ✅ جلب بيانات المستخدم باستخدام `username`
      this.userService.getUserByUsername(username).subscribe(
        (user: any) => {
          if (user && user.userid) {
            this.userId = user.userid; // ✅ تعيين userId بعد جلبه
            console.log('Extracted User ID:', this.userId);
  
            this.initializeForm();  
            this.loadUserData(); 
            this.getAllCharities();
          } else {
            console.error('User not found!');
          }
        },
        (error) => {
          console.error('Error fetching user by username:', error);
        }
      );
  
    } catch (error) {
      console.error('Invalid token format:', error);
    }
  
    
    

  }
  

  getUserInfo() {
    this.userId1 = localStorage.getItem('userid');
    this.username = localStorage.getItem('username');
    this.fullname = localStorage.getItem('Fullname');
    this.roleId = localStorage.getItem('roleid');
    
    console.log('User info fetched from localStorage:', {
      userId: this.userId1,
      username: this.username,
      fullname: this.fullname,
      roleId: this.roleId
    });
  }
  
  private initializeForm() {
    this.updateForm = new FormGroup({
      // userid: new FormControl(this.userId),
      userid: new FormControl(null), // سيتم تحديثه لاحقًا
      fullname: new FormControl(''),
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      phone: new FormControl(''),
      dateofbirth: new FormControl(''),
      profilepicture: new FormControl('')
    });
  }

  // 🔹 Fetch User Data from API
  private loadUserData() {
    if (!this.userId) return;
    this.userService.getUserById(this.userId).subscribe(
      (user: any) => {
        if (user) {
          console.log('User Data Loaded:', user);
          this.updateForm.patchValue({
            userid: user.userid,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            password: user.password, // Do not fill password for security reasons
            phone: user.phone,
            dateofbirth: user.dateofbirth ? user.dateofbirth.split('T')[0] : '', // Format date
            profilepicture: user.profilepicture
          });
        } else {
          console.error('User not found!');
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
        alert('Error loading user data.');
      }
    );
  }

  updateUser() {
    if (this.updateForm.invalid) return; 

    let formData = { ...this.updateForm.value };

    

    console.log('Updating User:', formData);
    this.userService.updateUser(formData).subscribe(
      (response) => {
        console.log('User updated successfully:', response);
        alert('Profile updated successfully!');
      },
      (error) => {
        console.error('Error updating user:', error);
        alert('Error updating profile!');
      }
    );
  }


  updateUserWithImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return; // Check if files exist

    let fileToUpload = input.files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.userService.uploadAttachment(formData).subscribe(
      (response: any) => {
        console.log('Image Uploaded:', response);
        const imagePath = `assets/userImages/${response.imagename}`; // Set image path

        this.updateForm.patchValue({ profilepicture: imagePath }); // Update profile picture path
        // this.updateUser(); // Call update function to save changes (including new profile picture)
      },
      (error) => {
        alert('Error uploading image.');
        console.error('Error:', error);
      }
    );
  }

   openCreateDialog() {
      this.dialog.open(CreateCharityComponent, { autoFocus: true });
    }


  
  charities: any[] = [];
  filteredCharities: any[] = [];
  selectedStatus: string = 'all'; // Default status

  statuses = [
    { value: 'all', label: 'All Charities' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Accepted', label: 'Accepted' },
    { value: 'Rejected', label: 'Rejected' },
    { value: 'Paid', label: 'Shared' }
  ];


  // getAllCharities() {
  //   console.log("Fetching all charities...");
  //   this.userService.getAllCharities().subscribe(
  //     (data: any[]) => {
  //       console.log("Full API Response:", data);
  //       this.charities = data;
  //       this.filterCharities();
  //     },
  //     (error) => {
  //       console.error("API Error:", error);
  //     }
  //   );
  // }
  getAllCharities() {
    const userId = localStorage.getItem('userid');
  
    if (!userId) {
      console.error('User ID not found in localStorage!');
      return;
    }
  
    console.log("Fetching all charities...");
    this.userService.getAllCharities().subscribe(
      (data: any[]) => {
        console.log("Full API Response:", data);
  
        // 🔍 Filter charities by current user ID
        this.charities = data.filter(charity => charity.userid == userId);
  
        this.filterCharities();
      },
      (error) => {
        console.error("API Error:", error);
      }
    );
  }
  setFilter(status: string) {
    this.selectedStatus = status;
    this.filterCharities();
  }

  // Filter charities based on selected status
  filterCharities() {
    console.log("Selected Status:", this.selectedStatus);
    if (this.selectedStatus === 'all') {
      this.filteredCharities = this.charities;
    } else {
      this.filteredCharities = this.charities.filter(charity => charity.status === this.selectedStatus);
    }
    console.log("Filtered charities:", this.filteredCharities);
  }

////////////////////////work


  
  // goToPayment(charity: any): void {
  //   console.log('Charity data:', charity); 
    
  //   const charityId = charity.charityid;  
  
  //   if (charityId && !isNaN(charityId)) {
  //     console.log('Proceeding with payment for charityId:', charityId); 
  
  //     // Call the payment service and update charity status
  //     this.paymentService.updateCharityStatusToPaid(charityId).subscribe(
  //       (response) => {
  //         console.log('Charity status updated:', response);
  //         this.paymentService.checkout(charity.category?.profit)
  //           .then(result => console.log('Checkout session initiated:', result))
  //           .catch(error => console.error('Error during Stripe payment:', error));
  //       },
  //       (error) => {
  //         console.error('Error updating charity status:', error);
  //         alert('Failed to update charity status. Please try again.');
  //       }
  //     );
  //   } else {
  //     console.error('Invalid charity data or charityId missing');
  //     alert('Invalid charity data.');
  //   }
  // }
  
  goToPayment(charity: any): void {
    console.log('Charity data:', charity); 
    
    const charityId = charity.charityid;  
  
    if (charityId && !isNaN(charityId)) {
      console.log('Proceeding with payment for charityId:', charityId); 

       // حفظ بيانات الفاتورة في sessionStorage
    sessionStorage.setItem('userid', localStorage.getItem('userid') || '');
    sessionStorage.setItem('charityid', charityId.toString());
    sessionStorage.setItem('amount', charity.category?.profit.toString());
  
      // أولاً: حدّث حالة الجمعية
      this.paymentService.updateCharityStatusToPaid(charityId).subscribe(
        (response) => {
          console.log('Charity status updated:', response);
  
          localStorage.setItem('charityid', charityId.toString());
           localStorage.setItem('amount', charity.category?.profit.toString());

          // ثانياً: ابدأ الدفع عبر Stripe
          this.paymentService.checkout(charity.category?.profit)
            .then(result => {
              console.log('Checkout session initiated:', result);
  
              // ✅ بعد نجاح الدفع، أنشئ الفاتورة
              const invoice = {
                userid:  localStorage.getItem('userid'), // أو أي طريقة لجلب ID المستخدم
                charityid: localStorage.getItem('charityid'),
                amount: localStorage.getItem('amount') ,
                type: 'Charity',
                invoicedate: new Date().toISOString().split('T')[0]
              };
              console.log(' Invoice to be sent:', invoice)
              this.userService.createInvoice(invoice).subscribe(() => {
                alert('Invoice created successfully!');
              }, (err) => {
                console.error('Invoice creation failed:', err);
              });
            })
            .catch(error => {
              console.error('Error during Stripe payment:', error);
            });
        },
        (error) => {
          console.error('Error updating charity status:', error);
          alert('Failed to update charity status. Please try again.');
        }
      );
    } else {
      console.error('Invalid charity data or charityId missing');
      alert('Invalid charity data.');
    }
  }
  
  openTestimonialDialog() {
    this.dialog.open(CreateTestimonialComponent, {
      width: '500px',
    });
  }
  
}
