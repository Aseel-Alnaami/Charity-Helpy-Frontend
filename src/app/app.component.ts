// import { Compngonent } from '@angular/core';
import { Router } from '@angular/router'; 

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'Charity';

//   hideNavAndFooter = false;

//   constructor(private router: Router) {
//     this.router.events.subscribe(() => {
//       // Define routes where navbar and footer should be hidden
//       const authRoutes = ['/auth/', '/auth/register'];
//       this.hideNavAndFooter = authRoutes.includes(this.router.url);
//     });
//   }
// }


import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'Charity';
  ngAfterViewInit() {
    setTimeout(() => {
      const preloader = document.querySelector('.preloader') as HTMLElement;

      if (preloader) {
        preloader.style.display = 'none'; 
      }
    }, 2000); 
  }
}
