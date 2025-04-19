import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private router:Router,private spinner: NgxSpinnerService) { }
  // private toastr:ToastrService,
  // submit(username: any, password: any) {
  //   console.log("AuthService submit() called with:", username, password);
  //   // التحقق من صحة المدخلات
  //   if (!username|| !password) {
  //     this.toastr.error('Please enter both email and password');
  //     return;
  //   }
  
  //   // إنشاء body للطلب
  //   const body = {
  //     username: username.toString(),
  //     password: password.toString(),
  //     fullname: "Heba" ,
  //     email: "heba@email.com",
  //     phone: '07771414',
  //     profilepicture: "picture", 
  //     roleid: 1 

  //   };
  
  //  alert("hellooo1")
  
  //  // Send the POST request
  // this.http.post('https://localhost:7095/api/jwt', body, { responseType: 'text' }).subscribe(
  //   (resp: string) => {
  //     // The response is a string (JWT), no need to parse as JSON
  //     console.log('Token received:', resp);  // Logging the token

  //     // Save the token to localStorage
  //     localStorage.setItem('token', resp);

  //     // Decode the token (JWT) manually if needed
      
  //     const user: any = jwtDecode(resp);
  //     console.log('Decoded user:', user);

  //     const role1 = user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

  //    console.log(role1)
 

     
       
    
      
  //     localStorage.setItem('user', JSON.stringify(user));


  //       alert("hellooo2")
        
  //       if(role1==="1"){
  //         alert("hellooo3")
  //         this.toastr.success('Welcome to Admin Dashboard');
  //         this.router.navigate(['admin/dashboard']);
  //       } else if (role1 === '21') {
  //         alert("hooom")
  //          this.router.navigate(['Home']);
  //       } else {
  //         this.toastr.error('Unknown user role');
  //         this.router.navigate(['/']);
  //       }
  
       
  //     },
  //     (error) => {
  //       // معالجة الأخطاء
  //       this.toastr.error('Login failed. Please check your credentials.');
  //       this.spinner.hide();
  //       console.error('Login error:', error);
  //     }
  //   );
  // }

  submit(username: any, password: any) {
    console.log("AuthService submit() called with:", username, password);
    
    // Validate inputs
    if (!username || !password) {
      // this.toastr.error('Please enter both username and password');
      return;
    }
  
    // Create body for the authentication request
    const authBody = {
      username: username.toString(),
      password: password.toString()
    };
  
    //Send the POST request for authentication
    // this.http.post('https://localhost:7095/api/jwt', authBody, { responseType: 'text' }).subscribe(
    //   (resp: string) => {
    //     console.log('Token received:', resp);
    //     localStorage.setItem('token', resp);
  
    //     // Decode the token
    //     const user: any = jwtDecode(resp);
    //     console.log('Decoded user:', user);
  
    //     const role1 = user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    //     localStorage.setItem('user', JSON.stringify(user));
  
        // Fetch user details based on username
        this.http.get(`https://localhost:7140/api/UserInfo/GetUserByName/${username}`).subscribe(
          (userDetails: any) => {
            // Assuming userDetails contains the necessary user info
            const userInfo = {
              fullname: userDetails.fullname,
              username: username,
              phone: userDetails.phone,
              email: userDetails.email,
              profilepicture: userDetails.profilepicture,
              password: password,
              roleid: userDetails.roleid
            };
            alert("yesss")

            console.log(userInfo);
  
            // Send user info to the JWT API
          //   this.http.post('https://localhost:7095/api/jwt', userInfo).subscribe((jwtResponse:any) => {
          //       // Handle the JWT response
          //       console.log('JWT response with user info:', jwtResponse);
          //       // You can store the new JWT or handle it as needed
          //       localStorage.setItem('token', jwtResponse); // Store the new token if needed
          //     },
          //     (error) => {
          //       console.error('Failed to send user info to JWT API.');
          //       console.error('JWT API error:', error);
          //     }
          //   );
          // }

           // Second: Send user info to JWT API
      this.http.post('https://localhost:7140/api/jwt', userInfo, { responseType: 'text' }).subscribe(
        (jwtResponse: string) => {
          console.log('JWT response:', jwtResponse);
          
          localStorage.setItem('token', jwtResponse);
          
          // Decode the JWT to get user role (if needed)
          const decodedUser: any = jwtDecode(jwtResponse);
          const role1= decodedUser['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
           // Navigate based on role
            if (role1 === "1") {
              // this.toastr.success('Welcome to Admin Dashboard');
              this.router.navigate(['/admin']);
            } else if (role1 === '2') {
              this.router.navigate(['/user/profile']);
            } else {
              // this.toastr.error('Unknown user role');
              this.router.navigate(['/']);
            }
          },
          (error) => {
            // this.toastr.error('Failed to fetch user details.');
            console.error('User  details error:', error);
          }
        );
      },
      (error) => {
        // this.toastr.error('Login failed. Please check your credentials.');
        console.error('Login error:', error);
      }
    );
  }
      
        getUserByUsername(username: string): Observable<any> {
          return this.http.get(`https://localhost:7140/api/UserInfo/GetUserByName/${username}`);
        }
  
}