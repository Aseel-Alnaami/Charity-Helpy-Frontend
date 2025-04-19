import { Component } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  loginForm: FormGroup;

  constructor(private router: Router, public auth: AuthService, private spinner: NgxSpinnerService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(7)])
    });
  }

  login() {
    alert("Login function called!");  // Confirm function execution
    console.log("Login function triggered");
    if (this.loginForm.valid) {
      this.spinner.show();
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      console.log("Attempting login with:", username, password);

      this.auth.submit(username, password);
      this.saveUserInfo(username);//////////////////////////////////new

      setTimeout(() => {
        this.spinner.hide();
      }, 3000);
    } else {
      alert('Form is invalid');
    }}


    saveUserInfo(username: string) {
      console.log("Fetching user details for:", username);
      
      this.auth.getUserByUsername(username).subscribe(
        (userDetails: any) => {
          // Save user data into localStorage
          localStorage.setItem('roleid', userDetails.roleid.toString());
          localStorage.setItem('userid', userDetails.userid.toString());
          localStorage.setItem('Fullname', userDetails.fullname.toString());
          localStorage.setItem('username', username);
  
          console.log('User information saved to localStorage:', userDetails);
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    }

  }
  // goToregister(){
  //   this.router.navigate(['register']);
  //   };