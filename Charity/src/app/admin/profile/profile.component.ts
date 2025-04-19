import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: number = 10; // User ID can be set dynamically or through routing
  updateForm!: FormGroup; // Declare FormGroup for updating user data

  constructor(private userService: UserService) {}

  ngOnInit() {
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
  
            this.initializeForm();  // Initialize the form on component load
            this.loadUserData();    // Fetch user data from API
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
  
    // this.getAllCharities();
    // this.initializeForm();  
    // this.loadUserData();    
  }
  // ngOnInit() {
  //   this.initializeForm();  // Initialize the form on component load
  //   this.loadUserData();    // Fetch user data from API
  // }

  // 🔹 Initialize the form with default values
  private initializeForm() {
    this.updateForm = new FormGroup({
      userid: new FormControl(this.userId),
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

  // 🔹 Update User Data without changing password (if not provided)
  updateUser() {
    if (this.updateForm.invalid) return; // Exit if form is invalid

    let formData = { ...this.updateForm.value };

    // Avoid updating password if it is not provided
    //if (!formData.password) {
      // If password is not provided, ensure it is not deleted
    //  formData.password = ''; // Or leave the password field as empty string if the backend requires it
    //}

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

  

  // 🔹 Upload and Update Profile Picture
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
}
