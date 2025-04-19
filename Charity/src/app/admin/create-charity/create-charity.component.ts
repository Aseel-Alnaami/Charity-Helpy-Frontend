// // // // // import { Component } from '@angular/core';
// // // // // import { FormGroup, FormControl, Validators } from '@angular/forms';
// // // // // import { AdminService } from 'src/app/Services/admin.service';

// // // // // @Component({
// // // // //   selector: 'app-create-charity',
// // // // //   templateUrl: './create-charity.component.html',
// // // // //   styleUrls: ['./create-charity.component.css']
// // // // // })
// // // // // export class CreateCharityComponent {

// // // // //   categories: any[] = [];

// // // // //   createForm: FormGroup = new FormGroup({
// // // // //     charityname: new FormControl('', [Validators.required, Validators.minLength(3)]),
// // // // //     description: new FormControl('', [Validators.required]),
// // // // //     charityimg: new FormControl('', [Validators.required]),
// // // // //     goals: new FormControl('', [Validators.required]),
// // // // //     location: new FormControl('', [Validators.required]),
// // // // //     target: new FormControl('', [Validators.required, Validators.min(1)]),
// // // // //     userid: new FormControl('', [Validators.required]),
// // // // //     categoryid: new FormControl('', [Validators.required])
// // // // //   });

// // // // //   constructor(private admin: AdminService) {}
 

// // // // //   ngOnInit(): void {
// // // // //     this.getCategories();  // جلب الفئات عند تحميل المكون
// // // // //   }

// // // // //   getCategories() {
// // // // //     this.admin.getCategories().subscribe(
// // // // //       (data) => {
// // // // //         console.log('Categories:', data);
// // // // //         this.categories = data;  // تعيين الفئات المستلمة من الـ API
// // // // //       },
// // // // //       (error) => {
// // // // //         console.error('Error fetching categories', error);
// // // // //       }
// // // // //     );
// // // // //   }

// // // // //   saveCharity() {
// // // // //     // debugger;
// // // // //     console.log('Form submitted:', this.createForm.value); // Debug

// // // // //     if (this.createForm.valid) {
// // // // //       this.admin.CreateCharity(this.createForm.value);
// // // // //     } else {
// // // // //       console.log('Form Invalid');
// // // // //     }
// // // // //   }
// // // // // }


// // // // import { Component, OnInit } from '@angular/core';
// // // // import { FormGroup, FormControl, Validators } from '@angular/forms';
// // // // import { AdminService } from 'src/app/Services/admin.service';
// // // // import * as L from 'leaflet';

// // // // @Component({
// // // //   selector: 'app-create-charity',
// // // //   templateUrl: './create-charity.component.html',
// // // //   styleUrls: ['./create-charity.component.css']
// // // // })
// // // // export class CreateCharityComponent implements OnInit {
  
// // // //   categories: any[] = [];
  
// // // //   createForm: FormGroup = new FormGroup({
// // // //     charityname: new FormControl('', [Validators.required, Validators.minLength(3)]),
// // // //     description: new FormControl('', [Validators.required]),
// // // //     charityimg: new FormControl('', [Validators.required]),
// // // //     goals: new FormControl('', [Validators.required]),
// // // //     location: new FormControl('', [Validators.required]),
// // // //     target: new FormControl('', [Validators.required, Validators.min(1)]),
// // // //     userid: new FormControl('', [Validators.required]),
// // // //     categoryid: new FormControl('', [Validators.required]),
// // // //     latitude: new FormControl('', [Validators.required]),
// // // //     longitude: new FormControl('', [Validators.required])
// // // //   });

// // // //   map: any;
// // // //   marker: any;

// // // //   constructor(private admin: AdminService) {}

// // // //   ngOnInit(): void {
// // // //     this.getCategories();  // جلب الفئات عند تحميل المكون
// // // //     this.initializeMap();  // تهيئة الخريطة عند تحميل المكون
// // // //   }

// // // //   getCategories() {
// // // //     this.admin.getCategories().subscribe(
// // // //       (data) => {
// // // //         console.log('Categories:', data);
// // // //         this.categories = data;
// // // //       },
// // // //       (error) => {
// // // //         console.error('Error fetching categories', error);
// // // //       }
// // // //     );
// // // //   }

// // // //   initializeMap() {
// // // //     // إنشاء الخريطة وتحديد موقعها الأولي
// // // //     this.map = L.map('map').setView([51.505, -0.09], 13); // تغيير الإحداثيات الأولية إذا لزم الأمر

// // // //     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// // // //       attribution: '© OpenStreetMap contributors'
// // // //     }).addTo(this.map);

// // // //     // إضافة أحداث على الخريطة
// // // //     this.map.on('click', (e: any) => {
// // // //       if (this.marker) {
// // // //         this.map.removeLayer(this.marker); // إزالة الماركر السابق
// // // //       }
// // // //       // إضافة ماركر جديد عند الضغط على الخريطة
// // // //       this.marker = L.marker(e.latlng).addTo(this.map);

// // // //       // تحديث الإحداثيات في النموذج
// // // //       this.createForm.patchValue({
// // // //         latitude: e.latlng.lat,
// // // //         longitude: e.latlng.lng,
// // // //         location: `Latitude: ${e.latlng.lat}, Longitude: ${e.latlng.lng}`
// // // //       });
// // // //     });
// // // //   }

// // // //   saveCharity() {
// // // //     console.log('Form submitted:', this.createForm.value); // Debugging
// // // //     if (this.createForm.valid) {
// // // //       this.admin.CreateCharity(this.createForm.value);
// // // //     } else {
// // // //       console.log('Form Invalid');
// // // //     }
// // // //   }
// // // // }


// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { AdminService } from 'src/app/Services/admin.service';
// import * as L from 'leaflet';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// @Component({
//   selector: 'app-create-charity',
//   templateUrl: './create-charity.component.html',
//   styleUrls: ['./create-charity.component.css']
// })
// export class CreateCharityComponent implements OnInit {
  
//   categories: any[] = [];
//   selectedFile: File | null = null; // لتخزين الصورة المختارة
//   map: any;
//   marker: any;

//   createForm: FormGroup = new FormGroup({
//     charityname: new FormControl('', [Validators.required, Validators.minLength(3)]),
//     description: new FormControl('', [Validators.required]),
//     charityimg: new FormControl('', [Validators.required]),
//     goals: new FormControl('', [Validators.required]),
//     location: new FormControl('', [Validators.required]),
//     target: new FormControl('', [Validators.required, Validators.min(1)]),
//     userid: new FormControl('', [Validators.required]),
//     categoryid: new FormControl('', [Validators.required]),
//     latitude: new FormControl('', [Validators.required]),
//     longitude: new FormControl('', [Validators.required])
//   });

//   constructor(private admin: AdminService, private http: HttpClient) {}

//   ngOnInit(): void {
//     this.getCategories();
//     this.initializeMap();
//   }

//   getCategories() {
//     this.admin.getCategories().subscribe(
//       (data) => {
//         console.log('Categories:', data);
//         this.categories = data;
//       },
//       (error) => {
//         console.error('Error fetching categories', error);
//       }
//     );
//   }

//   initializeMap() {
//     this.map = L.map('map').setView([31.9539, 35.9106], 13); // عمان كإحداثيات افتراضية
  
//     // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     //   attribution: '© OpenStreetMap contributors',
//     //   subdomains: 'abcd'
//     // }).addTo(this.map);

//     L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
//           attribution: '© OpenStreetMap & CartoDB',
//           subdomains: 'abcd'
//         }).addTo(this.map);
  
//     this.map.on('click', (e: any) => {
//       if (this.marker) {
//         this.map.removeLayer(this.marker);
//       }
//       this.marker = L.marker(e.latlng).addTo(this.map);
  
//       // تحديث الإحداثيات في النموذج
//       this.createForm.patchValue({
//         latitude: e.latlng.lat,  // حفظ قيمة خط العرض
//         longitude: e.latlng.lng, // حفظ قيمة خط الطول
//       });
  
//       // تحويل الإحداثيات إلى موقع نصي
//       this.reverseGeocode(e.latlng.lat, e.latlng.lng);
//     });
//   }
  

//   reverseGeocode(lat: number, lng: number) {
//     const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

//     this.http.get(url).subscribe((data: any) => {
//       console.log("Full Address:", data.display_name); // Debug: طباعة العنوان الكامل
      
//       // استخراج المنطقة والمدينة فقط
//       let area = data.address.suburb || data.address.neighbourhood || ""; // المنطقة (مثال: جبل عمان)
//       let city = data.address.city || data.address.town || data.address.village || "Unknown"; // المدينة (مثال: Amman)
      
//       // دمج المنطقة والمدينة معًا
//       let shortAddress = `${area}, ${city}`.trim();
      
//       // تحديث الفورم بالقيمة المختصرة
//       this.createForm.patchValue({
//         location: shortAddress
//       });

//     }, (error: HttpErrorResponse) => {
//       console.error("Error fetching location:", error);
//     });
//   }

//   onFileSelected(event: any) {
//     if (event.target.files.length > 0) {
//       this.selectedFile = event.target.files[0];
      
//       const formData = new FormData();
//       if (this.selectedFile) {
//         formData.append('file', this.selectedFile);
//       }
  
//       this.admin.uploadCharityImage(formData).subscribe(
//         (response: any) => {
//           console.log('Image uploaded:', response);
//           this.createForm.patchValue({ charityimg: response.imagename });
//         },
//         (error) => {
//           console.error('Error uploading image', error);
//         }
//       );
//     }
//   }
  

//   saveCharity() {
//     console.log('Form submitted:', this.createForm.value);
//     if (this.createForm.valid) {
//       this.admin.CreateCharity(this.createForm.value);
//     } else {
//       console.log('Form Invalid');
//     }
//   }
// }



import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
import { AdminService } from 'src/app/Services/admin.service';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-charity',
  templateUrl: './create-charity.component.html',
  styleUrls: ['./create-charity.component.css']
})
export class CreateCharityComponent implements OnInit {
  
  categories: any[] = [];
  users: any[] = [];
  isAdmin: boolean = false;
  loggedInUserId: string | null = null;
  map: any;
  marker: any;
  selectedFile: File | null = null;

  createForm: FormGroup = new FormGroup({
    charityname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required]),
    charityimg: new FormControl('', [Validators.required]),
    goals: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    target: new FormControl('', [Validators.required, Validators.min(1)]),
    userid: new FormControl('', [Validators.required]),
    categoryid: new FormControl('', [Validators.required]),
    latitude: new FormControl('', [Validators.required]),
    longitude: new FormControl('', [Validators.required])
  });

  constructor(private userService: UserService, private admin: AdminService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getCategories();
    this.checkUserRole();
    this.initializeMap();
    this.setUserIdFromToken();

    if (this.isAdmin) {
      this.getUsers();
    } else {
      this.setUserIdFromToken();
    }
  }

  checkUserRole() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found!');
      return;
    }

    try {
      const decodedToken: any = JSON.parse(atob(token.split('.')[1]));
      const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      this.isAdmin = role === '1';

      if (!this.isAdmin) {
        this.setUserIdFromToken();
      }
    } catch (error) {
      console.error('Invalid token format:', error);
    }
  }

  getUsers() {
    this.admin.getAllUsers().subscribe(
      (data: any) => {
        this.users = data;
      },
      (error: any) => {
        console.error('Error fetching users', error);
      }
    );
  }

  setUserIdFromToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found!');
      return;
    }

    try {
      const decodedToken: any = JSON.parse(atob(token.split('.')[1]));
      const username = decodedToken?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

      if (!username) {
        console.error('Username not found in token!');
        return;
      }

      this.userService.getUserByUsername(username).subscribe(
        (user: any) => {
          if (user && user.userid) {
            this.loggedInUserId = user.userid;
            console.log(this.loggedInUserId);
            this.createForm.patchValue({ userid: this.loggedInUserId});
          } else {
            console.error('User not found!');
          }
        },
        (error: any) => {
          console.error('Error fetching user by username:', error);
        }
      );
    } catch (error) {
      console.error('Invalid token format:', error);
    }
  }

  getCategories() {
    this.admin.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error: any) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  saveCharity() {
    console.log('Form submitted:', this.createForm.value);
    if (this.createForm.valid) {
      this.admin.CreateCharity(this.createForm.value);
    } else {
      console.log('Form Invalid');
    }
  }

  initializeMap() {
    this.map = L.map('map').setView([31.9539, 35.9106], 13);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap & CartoDB',
      subdomains: 'abcd'
    }).addTo(this.map);

    this.map.on('click', (e: any) => {
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      this.marker = L.marker(e.latlng).addTo(this.map);

      this.createForm.patchValue({
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      });

      this.reverseGeocode(e.latlng.lat, e.latlng.lng);
    });
  }

  // reverseGeocode(lat: number, lng: number) {
  //   const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

  //   this.http.get(url).subscribe((data: any) => {
  //     let area = data.address.suburb || data.address.neighbourhood || "";
  //     let city = data.address.city || data.address.town || data.address.village || "Unknown";
  //     let country = data.address.country || "Unknown";
  //     let shortAddress = `${area}, ${city},  ${country}`.trim();

  //     this.createForm.patchValue({
  //       location: shortAddress
  //     });
  //   }, (error: any) => {
  //     console.error("Error fetching location:", error);
  //   });
  // }

  reverseGeocode(lat: number, lng: number) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=en`;
  
    this.http.get(url).subscribe((data: any) => {
      let area = data.address.suburb || data.address.neighbourhood || "";
      let city = data.address.city || data.address.town || data.address.village || "Unknown";
      let country = data.address.country || "Unknown";
      let shortAddress = `${area}, ${city}, ${country}`.trim();
  
      this.createForm.patchValue({
        location: shortAddress
      });
    }, (error: any) => {
      console.error("Error fetching location:", error);
    });
  }
  

   onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      
      const formData = new FormData();
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }
  
      this.admin.uploadCharityImage(formData).subscribe(
        (response: any) => {
          console.log('Image uploaded:', response);
          this.createForm.patchValue({ charityimg: response.imagename });
        },
        (error) => {
          console.error('Error uploading image', error);
        }
      );
    }
  }
}
