import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';  


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  /////// dashboard admin

  getUsersCount(): Observable<number> {
    return this.http.get<number>(`https://localhost:7140/api/UserInfo/users/count`);
  }

  getCharitiesCount(): Observable<number> {
    return this.http.get<number>(`https://localhost:7140/api/Charities/charities/count`);
  }
  
  getDonationsCount(): Observable<number> {
    return this.http.get<number>(`https://localhost:7140/api/Donation/donations/count`);
  } 
  ///////////////// FAQ section
  GetAllFAQPage(): Observable<any> {
    return this.http.get<any>('https://localhost:7140/api/FAQPage');
  }

  FAQPage:any=[{}];

  updateFAQPage(body: any) {
    this.http.put('https://localhost:7140/api/FAQPage', body).subscribe(
      (resp: any) => {
        console.log('Updated successfully:', resp); 
        window.location.reload();
      },
      (err) => {
        console.error('Error updating user:', err);
      }
    );
  }
  
  ///////////contact page
  uploadContactPageImage(file: FormData): Observable<any> {
    return this.http.post('https://localhost:7140/api/ContactPage/UploadImage', file);
  }

  GetAllContactPage(): Observable<any> {
    return this.http.get<any>('https://localhost:7140/api/ContactPage');
  }

  ContactPage:any=[{}];

  updateContactPage(body: any) {
    this.http.put('https://localhost:7140/api/ContactPage', body).subscribe(
      (resp: any) => {
        console.log('Updated successfully:', resp); 
        window.location.reload();
      },
      (err) => {
        console.error('Error updating user:', err);
      }
    );
  }

    ///////////contact page
    uploadHomePageImage(file: FormData): Observable<any> {
      return this.http.post('https://localhost:7140/api/HomePage/UploadImage', file);
    }
  
    GetAllHomePage(): Observable<any> {
      return this.http.get<any>('https://localhost:7140/api/HomePage');
    }
  
    HomePage:any=[{}];
  
    updateHomePage(body: any) {
      this.http.put('https://localhost:7140/api/HomePage', body).subscribe(
        (resp: any) => {
          console.log('Updated successfully:', resp); 
          window.location.reload();
        },
        (err) => {
          console.error('Error updating user:', err);
        }
      );
    }


  ///// user info

  private baseUrl = 'https://localhost:7140/api/UserInfo';
// S1 New instance of httpClient service.(get all).
//Step two: Declare an array to store the data that will be retrieved. courses:any=[{}];
UserInfo:any=[{}];
//Step three: use the HTTP method (get) to receive the data from the course table and save it in
//the courses array that is declared in the previous step.
GetAllUsers(){
  this.http.get('https://localhost:7140/api/UserInfo').subscribe((res:any)=>{
    this.UserInfo=res;
    console.log(this.UserInfo);
  },err=> {
    console.log(err.status);
  })
}

getAllUsers(): Observable<any> {
  return this.http.get<any>('https://localhost:7140/api/UserInfo');
}


deleteUser(id:number){
this.http.delete('https://localhost:7140/api/UserInfo/DeleteUser/'+id).subscribe((resp:any)=>{
  console.log('Deleted');
  alert('the user Deleted Successfully!!')
},
err=>{
  console.log('Something went wrog');
})
}

createUser(user:any){

  return this.http.post('https://localhost:7140/api/UserInfo/CreateUser', user).subscribe(
    (res: any) => {
      console.log('User created successfully');
      alert('User Created Successfully!');
      this.GetAllUsers(); // Refresh 
    },
    (err) => {
      console.error('Error creating user', err);
      alert('Error while creating user');
    }
  );}

  
  updateUser(body: any) {
    debugger;
    console.log('Request body:', body);  
  
    this.http.put('https://localhost:7140/api/UserInfo', body).subscribe(
      (resp: any) => {
        console.log('Updated successfully:', resp); 
        alert('Updated Successfully!');
        this.GetAllUsers();  
      },
      (err) => {
        console.error('Error updating user:', err);
        console.log('Validation Errors:', err.error);  
        alert('Error while updating user: ' + (err.error?.title || 'Unknown error'));
      }
    );
  }


// display_image:any;
// uploadAttachment(file :FormData){

// this.http.post('https://localhost:7140/api/UserInfo/UploadImage',file).subscribe(
//   (resp:any)=>{
//     console.log("Resp Upload function",resp);
//  this.display_image= resp.imagename; },err=>{
//   alert('Something wont wrong');
//  console.log(err); }) }
    


uploadAttachment(file: FormData): Observable<any> {
  return this.http.post('https://localhost:7140/api/UserInfo/UploadImage', file);
}


 /////////category 
 Category:any=[{}];

 GetAllCategory(){
  this.http.get('https://localhost:7140/api/Categories').subscribe((res:any)=>{
    this.Category=res;
    console.log(this.Category);
  },err=> {
    console.log(err.status);
  })
}


deleteCategory(id:number){
  this.http.delete('https://localhost:7140/api/Categories/delete/'+id).subscribe((resp:any)=>{
    console.log('Deleted');
    this.GetAllCategory();
    alert('the user Deleted Successfully!!')
  },
  err=>{
    console.log('Something went wrog');
  })
  }


  
createCategory(Category:any){

  return this.http.post('https://localhost:7140/api/Categories', Category).subscribe(
    (res: any) => {
      console.log('Category created successfully');
      alert('Category Created Successfully!');
      this.GetAllCategory(); 
    },
    (err) => {
      console.error('Error creating Category', err);
      alert('Error while creating Category');
    }
  );}

  
  
  updateCategory(body: any) {
    debugger;
    console.log('Request body:', body);  
  
    this.http.put('https://localhost:7140/api/Categories', body).subscribe(
      (resp: any) => {
        console.log('Updated successfully:', resp); 
        alert('Updated Successfully!');
        this.GetAllCategory();  
      },
      (err) => {
        console.error('Error updating Category:', err);
        console.log('Validation Errors:', err.error);  // ✅ Log detailed errors
        alert('Error while updating Category: ' + (err.error?.title || 'Unknown error'));
      }
    );
  }


/////////////////////////////////roles function 

Roles:any=[{}];

getallRoles(){
  this.http.get("https://localhost:7140/api/Role").subscribe((res:any)=>{
    this.Roles=res; 
    console.log(this.Roles); 
    },err=>{
     console.log(err.status);
     })
}

CreateRole(body: any) {
  this.http.post('https://localhost:7140/api/Role/', body).subscribe(
      (resp) => { 
        alert('Created Sucessfully');
      },
      (err) => { 
          alert('Something wont wrong');}
  );
}
//////////////////// Invoice

Invoices:any=[{}];


getallInvoices(){
  this.http.get("https://localhost:7140/api/Invoice").subscribe((res:any)=>{
    this.Invoices=res; 
    console.log(this.Invoices); 
    },err=>{
     console.log(err.status);
     })
}

////////////////////Donation
//Step four: Create an object of home Service in the Manage Course component.

private baseUrl2 = 'https://localhost:7140/api/Donation';
getAllDonations(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl2}/AllDonationsWithUsers`);
}

// Delete a donation by ID
deleteDonation(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl2}/DeleteDonation/${id}`);
}


/////////////////////////// ContactUs 
ContactUs:any=[{}];
private apiUrl = 'https://localhost:7140/api/ContactUs';
getallIcontactus(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl); // Ensure it returns an Observable of type any[]
}
getContactsByStatus(status: string): Observable<any> {
   return this.http.get("https://localhost:7140/api/ContactUs/getByStatus/{status}"); // Adjust the endpoint as necessary
 }

deleteContact(id: number): Observable<any> {
debugger;
 return this.http.delete('${this.apiUrl}/delete/${id}');

}
 
replyToContact(contactId: number, replyMessage: string) {
  const params = new HttpParams()
    .set('contactId', contactId.toString())
    .set('replyMessage', replyMessage);

  return this.http.post('https://localhost:7140/api/ContactUs/SendEmail', null, { params });
}

///////////////////////charity
charities: any = [];
categories: any = [];
problems: any = [];
private categoriesUrl = "https://localhost:7140/api/Categories";

getCategories(): Observable<any> {
  return this.http.get<any>(this.categoriesUrl);
}

// GetAllCharities(){
//   // debugger;
//    this.http.get("https://localhost:7140/api/Charities").subscribe(res=>{
//     this.charities= res;
//    }, err=>{
//     console.log(err);
//    })
// }

GetAllCharities(): Observable<any> {
  return this.http.get("https://localhost:7140/api/Charities");
}

DeleteCharity(id:number)
{
  // debugger;
  this.http.delete("https://localhost:7140/api/Charities/delete/"+id).subscribe(resp=>{
    console.log("True");
    window.location.reload();
  },err=>{
    console.log("Error");
  })
  // window.location.reload();
}

CreateCharity(body:any){
  // debugger;
  this.http.post("https://localhost:7140/api/Charities", body).subscribe((resp)=>{
    console.log("Created");
    window.location.reload();
  },err=>{
    console.log(err.status);
  })
}

UpdateCharity(body:any){
  // debugger;
  this.http.put("https://localhost:7140/api/Charities",body).subscribe((resp)=>{
    console.log("Updated");
    window.location.reload();
  },err=>{
    console.log("something want wrong!!");
  })}

  // updateCharity(body: any): Observable<any> {
  //   return this.http.put(`https://localhost:7140/api/Charities`, body);
  // }

  updateCharity(body: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put("https://localhost:7140/api/Charities", body, { headers });
  }
  

  // uploadCharityImage(formData: FormData) {
  //   return this.http.post<{ imagename: string }>(
  //     "https://localhost:7140/api/Charities/UploadcharityImage",
  //     formData
  //   );
  // }
  
  uploadCharityImage(file: FormData): Observable<any> {
    return this.http.post('https://localhost:7140/api/Charities/UploadcharityImage', file);
  }

////////////////Problem

GetAllProblems(){
  // debugger;
   this.http.get("https://localhost:7140/api/Problem").subscribe(res=>{
    this.problems= res;
   }, err=>{
    console.log(err);
   })
}

DeleteProblem(id:number)
{
  // debugger;
  this.http.delete("https://localhost:7140/api/Problem/DeleteProblem/"+id).subscribe(resp=>{
    console.log("True");
    window.location.reload();
  },err=>{
    console.log("Error");
  })
}

UpdateProblem(body:any){
  // debugger;
  this.http.put("https://localhost:7140/api/Problem/UpdateProblem",body).subscribe((resp)=>{
    console.log("Updated");
    window.location.reload();
  },err=>{
    console.log("something want wrong!!");
  })
}
//Step four: Create an object of home Service in the Manage Course component.
  constructor( private http:HttpClient) { }

  //////////////////////////////DYnamic Page

//////About Us Page

about:any=[{}];

GetAboutPage(): Observable<any> {
  return this.http.get("https://localhost:7140/api/AboutPage");
}

UpdateAboutPage(body: any): Observable<any> {
  return this.http.put("https://localhost:7140/api/AboutPage", body);
}


UploadaboutsImage(file: FormData): Observable<any> {
  return this.http.post('https://localhost:7140/api/AboutPage/UploadaboutsImage', file);
}

// Manage Testimonials
  
getTestimonialByStatus(status: string): Observable<any[]>
{
  return this.http.get<any[]>(`https://localhost:7140/api/Testimonial/${status}`);
}

approveTestimonial(id: number) {
  return this.http.put(`https://localhost:7140/api/Testimonial/${id}`, {});
}

deleteTestimonial(id: number){
  return this.http.delete(`https://localhost:7140/api/Testimonial/${id}`);
}

getAllTestimonial() {
  return this.http.get("https://localhost:7140/api/Testimonial");
}

}


 

