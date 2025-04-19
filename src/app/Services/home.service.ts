import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model'; // Adjust the path as necessary


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = "https://localhost:7140/api/ContactUs"; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  sendContact(contact: Contact): Observable<any> {
    return this.http.post(this.apiUrl, contact);
 

}

  getAllCharities(): Observable<any[]> {
    // console.log("🚀 Calling API: https://localhost:7140/api/Charities"); // Debugging
// alert("heey1");
    return this.http.get<any[]>('https://localhost:7140/api/Charities');
  }


  ///////////////////testamonial

  createTestimonial(testimonial: any): Observable<any>{
    return this.http.post<any>('https://localhost:7140/api/Testimonial', testimonial);
  }
getTestimonialByStatus(status: string): Observable<any[]>
  {
    return this.http.get<any[]>(`https://localhost:7140/api/Testimonial/${status}`);
  }

}