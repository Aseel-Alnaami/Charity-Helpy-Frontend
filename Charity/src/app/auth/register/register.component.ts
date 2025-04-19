import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { UserService } from 'src/app/Services/user.service';
import { ReactiveFormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

   constructor(private admin: AdminService,private user:UserService , private router: Router) {}

  newUser = {
    fullname: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    dateofbirth: '',
    profilepicture: '',
    roleid:2
  };


  UploadImage(file: any) {
    if (file.length === 0) return;  
    let fileToUpload = <File>file[0];  
    const formData = new FormData();  
    formData.append('file', fileToUpload, fileToUpload.name);

    this.admin.uploadAttachment(formData).subscribe(
      (response: any) => {
        console.log("API Response:", response);
        this.newUser.profilepicture = `assets/userImages/${response.imagename}`;
        console.log("img path sAVED", this.newUser.profilepicture);
      },
      (error) => {
        alert('No imagename found in the respons');
        console.log(error);
      }
    );
  }

  createUser(): void {
    if (this.newUser.fullname && this.newUser.username && this.newUser.email && this.newUser.password && this.newUser.phone && this.newUser.dateofbirth) {
      this.user.createUser(this.newUser).subscribe(
        (response: any) => {
          console.log('User created successfully', response);
          alert('User Created Successfully!');
          this.router.navigate(['/login']); 

        },
        (error: any) => {
          console.error('Error creating user', error);
          alert('Error while creating user');
        }
      );
    } else {
      alert('Please fill in all required fields');
    }
  }


  onSubmit() {
    this.createUser();   
    console.log('Form submitted', this.newUser);
  }
}