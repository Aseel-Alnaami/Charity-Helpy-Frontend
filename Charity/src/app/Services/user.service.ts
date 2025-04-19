import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

    
  // getUserIdFromToken(): number | null {
  //   const token = localStorage.getItem('token');
  //   if (!token) return null;
  
  //   const decodedToken = JSON.parse(atob(token.split('.')[1])); // فك تشفير التوكن
  //   return decodedToken?.userId || null; // استخراج userId
  // }

  CreateProblem(body: any) {
    // debugger;
    this.http.post('https://localhost:7140/api/Problem', body).subscribe(
      (resp) => {
        console.log('Created');
        window.location.reload();
      },
      (err) => {
        console.log(err.status);
      }
    );
  }

  // Method to update user data and return Observable
  updateUser(userData: any): Observable<any> {
    console.log('Request body:', userData);
    return this.http.put('https://localhost:7140/api/UserInfo', userData);  // Return the Observable
  }

  // Method to upload profile picture
  uploadAttachment(file: FormData): Observable<any> {
    return this.http.post('https://localhost:7140/api/UserInfo/UploadImage', file);
  }

  // Method to get user by ID
  getUserById(userId: number): Observable<any> {
    return this.http.get(`https://localhost:7140/api/UserInfo/GetUserById/${userId}`);
  }


  createUser(user: any): Observable<any> {
    return this.http.post('https://localhost:7140/api/UserInfo/CreateUser', user);
  }

  // getAllCharities(): Observable<any> {
  //   return this.http.get("https://localhost:7140/api/Charities");
  // }

  getAllCharities(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7140/api/Charities');
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get(`https://localhost:7140/api/UserInfo/GetUserByName/${username}`);
  }
  
  UpdateCharity(body:any){
    // debugger;
    this.http.put("https://localhost:7140/api/Charities",body).subscribe((resp)=>{
      console.log("Updated");
      window.location.reload();
    },err=>{
      console.log("something want wrong!!");
    })}
  
    createTestimonial(testimonial: any): Observable<any>{
      return this.http.post<any>('https://localhost:7140/api/Testimonial', testimonial);
    }
  

    createInvoice(invoiceData: any): Observable<any> {
      return this.http.post('https://localhost:7140/api/Invoice', invoiceData)
    }
    
    
    private apiUrl = 'https://localhost:7140/api/Invoice';
    
    sendInvoiceEmail(invoice: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/SendInvoiceEmail`, invoice);
    }
    
    getLatestInvoice() {
      const userId = localStorage.getItem('userid');
      return this.http.get(`https://localhost:7140/api/Invoice/GetInvoiceByUserId/${userId}`);
    }
    
    ///////Donations 
    
    
    
    private baseUrl2 = 'https://localhost:7140/api/Charities'; 
    
    private baseUrl3 = 'https://localhost:7140/api/PaymentInfo/make-payment';
    
    getCharities(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl2}`);
    }
    
    VisaPayment(paymentData: any): Observable<any> {
      return this.http.post(`${this.baseUrl3}`, paymentData);
    
    }
    
    currentdonate(charityId: number, amount: number): Observable<any> {
      const body = {
        charityId: charityId,
        amount: amount
      };
    
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    
      return this.http.post('https://localhost:7140/api/Charities/add-donation', body, {
        headers,
        responseType: 'text' as 'json'  // ✅ أهم سطر لحل المشكلة
      });
    }
    
    createDonation(donationData: { amount: number, userid: number, charityid: number }) {
      return this.http.post('https://localhost:7140/api/Donation', donationData);
    }
    

    createDonationInvoice(data: { userid: number, charityid: number, amount: number, type: string }) {
      return this.http.post('https://localhost:7140/api/Invoice', data);
    }
    
    
    getDonationLatestInvoice() {
      const userId = localStorage.getItem('userid');
      return this.http.get(`https://localhost:7140/api/Invoice/GetDonationInvoiceByUserId/${userId}`);
    }


    getDonationsByUserId(): Observable<any> {
      const userId = localStorage.getItem('userid'); // Assuming the value is stored as a string
      if (!userId) {
        throw new Error('User ID not found in local storage.');
      }
      return this.http.get(`https://localhost:7140/api/Donation/GetDonationByUserId/${userId}`);
    }
}
