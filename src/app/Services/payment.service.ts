// import { Injectable } from '@angular/core';
// import { loadStripe } from '@stripe/stripe-js';
// import { HttpClient } from '@angular/common/http'; // Import HttpClient


// @Injectable({
//   providedIn: 'root'
// })
// export class PaymentService {
//   stripe: any;

//   constructor(private http: HttpClient) {
//     this.initializeStripe();
//   }

//   async initializeStripe() {
//     this.stripe = await loadStripe('pk_test_51R9tGRChyhGaieFAKfoQ4KZGyCqkZCPixt3WswdQWXTIRvX7vh1n4K3VQGL9N2KXYv0hmR9OuAYzKEhSL9Y9AMlr00EGAlabns');
//   }

// //   async checkout(amount: number) {
// //     const session = await fetch('https://localhost:7140/api/Payment/create-checkout-session', {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({ amount })
// //     }).then(res => res.json());
// // console.log(amount);
// //     return this.stripe.redirectToCheckout({ sessionId: session.id });
// //   }

// async checkout(amount: number) {
//   const session = await fetch('https://localhost:7140/api/Payment/create-checkout-session', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ amount })
//   }).then(res => res.json());

//   console.log(amount);

//   // Redirect user to Stripe Checkout
//   return this.stripe.redirectToCheckout({
//     sessionId: session.id
//   });
// }



  
// UpdateCharityStatusToPaid(charityId: int) {
//     return this.http.put(`https://localhost:7140//api/Charities/update-status-to-paid/${charityId}`);
//   }
// }
import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  stripe: any;

  constructor(private http: HttpClient) {
    this.initializeStripe();
  }

  async initializeStripe() {
    this.stripe = await loadStripe('pk_test_51R9tGRChyhGaieFAKfoQ4KZGyCqkZCPixt3WswdQWXTIRvX7vh1n4K3VQGL9N2KXYv0hmR9OuAYzKEhSL9Y9AMlr00EGAlabns');
  }

  async checkout(amount: number): Promise<any> {
    const session = await fetch('https://localhost:7140/api/Payment/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount })
    }).then(res => res.json());

    return this.stripe.redirectToCheckout({
      sessionId: session.id
    });
  }

  // Call this function to update the charity's status after a successful payment
  updateCharityStatusToPaid(charityId: number): Observable<any> {
    // alert("updating2");
    console.log("Updating charity with ID:", charityId); // Log to check the charityId value
  return this.http.put(`https://localhost:7140/api/Charities/update-status-to-paid/${charityId}`, {});
}
}
