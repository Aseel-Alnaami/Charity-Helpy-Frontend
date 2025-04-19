// import { Component, AfterViewInit } from '@angular/core';
// import * as L from 'leaflet';
// import { UserService } from 'src/app/Services/user.service';

// @Component({
//   selector: 'app-map',
//   templateUrl: './map.component.html',
//   styleUrls: ['./map.component.css']
// })
// export class MapComponent implements AfterViewInit {
//   private map!: L.Map;

//   constructor(private userService: UserService) {}

//   ngAfterViewInit(): void {
//     this.initMap();
//     this.loadCharityLocations();
//   }


  
//   private initMap(): void {
//     this.map = L.map('map', {
//       center: [31.963158, 35.930359], 
//       zoom: 10, 
//       zoomControl: true 
//     }); // Default (Amman)
  
//     L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
//       attribution: '© OpenStreetMap & CartoDB',
//       subdomains: 'abcd'
//     }).addTo(this.map);
//   }
//   // private initMap(): void {
//   //   this.map = L.map('map').setView([31.963158, 35.930359], 10); // Default (Amman)
  
//   //   L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
//   //     attribution: '© OpenStreetMap & CartoDB',
//   //     subdomains: 'abcd'
//   //   }).addTo(this.map);
//   // }
  

//   // private loadCharityLocations(): void {
//   //   this.userService.getAllCharities().subscribe(charities => {
//   //     charities.forEach((charity: any) => {
//   //       L.marker([charity.latitude, charity.longitude])
//   //         .addTo(this.map)
//   //         .bindPopup(`<b>${charity.name}</b><br>${charity.address}`);
//   //     });
//   //   });
//   // }


//   // private loadCharityLocations(): void {
//   //   this.userService.getAllCharities().subscribe(charities => {
//   //     charities.forEach((charity: any) => {
//   //       const customIcon = L.divIcon({
//   //         html: '📍', 
//   //         className: 'custom-emoji-marker', 
//   //         iconSize: [30, 30], 
//   //         iconAnchor: [15, 30] 
//   //       });
  
//   //       L.marker([charity.latitude, charity.longitude], { icon: customIcon })
//   //         .addTo(this.map)
//   //         .bindPopup(`<b>${charity.charityname}</b><br>${charity.location}`);
//   //     });
//   //   });
//   // }
//   // private loadCharityLocations(): void {
//   //   this.userService.getAllCharities().subscribe(charities => {
//   //     charities.forEach((charity: any) => {
//   //       const customIcon = L.divIcon({
//   //         html: `<div class="custom-marker">
//   //                  📍 <img src="assets/charityImages/${charity.charityimg}" alt="Charity Image">
//   //                </div>`,
//   //         className: '', 
//   //         iconSize: [40, 40], 
//   //         iconAnchor: [20, 40] 
//   //       });
  
//   //       L.marker([charity.latitude, charity.longitude], { icon: customIcon })
//   //         .addTo(this.map)
//   //         .bindPopup(`
//   //           <div class="popup-content">
//   //             <b>${charity.charityname}</b><br>
//   //             <img src="assets/charityImages/${charity.charityimg}" alt="Charity Image" class="popup-img">
//   //             <p>${charity.location}</p>
//   //           </div>
//   //         `);
//   //     });
//   //   });
//   // }
  
//   private loadCharityLocations(): void {
//     this.userService.getAllCharities().subscribe(charities => {
//       charities.forEach((charity: any) => {
//         // Check if latitude and longitude exist
//         if (!charity.latitude || !charity.longitude) {
//           console.warn('Skipping charity ${charity.charityname}: Missing lat/lng');
//           return;
//         }
  
//         const customIcon = L.divIcon({
//           html: `<div class="custom-marker">
//                    📍 <img src="assets/charityImages/${encodeURIComponent(charity.charityimg)}" alt="Charity Image">
//                  </div>`,
//           className: '',
//           iconSize: [40, 40],
//           iconAnchor: [20, 40]
//         });
  
//         L.marker([charity.latitude, charity.longitude], { icon: customIcon })
//           .addTo(this.map)
//           .bindPopup(`
//             <div class="popup-content">
//               <b>${charity.charityname}</b><br>
//               <img src="assets/charityImages/${encodeURIComponent(charity.charityimg)}" alt="Charity Image" class="popup-img">
//               <p>${charity.location}</p>
//             </div>
//           `);
//       });
//     });
//   }
  

// }


import { Component, AfterViewInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnChanges {
  @Input() charities: any[] = [];
  @Input() focusLocation?: { lat: number, lng: number };


  private map!: L.Map;
  private markersLayer = L.layerGroup();

  ngAfterViewInit(): void {
    this.initMap();
    this.loadCharityLocations(); // أول مرة
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['charities'] && this.map) {
      this.loadCharityLocations();
    }
  
    if (changes['focusLocation'] && this.map && this.focusLocation) {
      this.map.setView([this.focusLocation.lat, this.focusLocation.lng], 14); 
    }
  }
  
  

    private initMap(): void {
    this.map = L.map('map', {
      center: [31.963158, 35.930359], 
      zoom: 10, 
      zoomControl: true 
    }); // Default (Amman)
  
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap & CartoDB',
      subdomains: 'abcd'
    }).addTo(this.map);

    this.markersLayer.addTo(this.map); 

  }

    private loadCharityLocations(): void {
      this.markersLayer.clearLayers();
    // this.userService.getAllCharities().subscribe(charities => {
      this.charities.forEach((charity: any) => {

        if (!charity.latitude || !charity.longitude) {
          console.warn('Skipping charity ${charity.charityname}: Missing lat/lng');
          return;
        }
  
        const customIcon = L.divIcon({
          html: `<div class="custom-marker">
                   📍 <img src="assets/charityImages/${encodeURIComponent(charity.charityimg)}" alt="Charity Image">
                 </div>`,
          className: '',
          iconSize: [40, 40],
          iconAnchor: [20, 40]
        });
  
        L.marker([charity.latitude, charity.longitude], { icon: customIcon })
          .addTo(this.markersLayer)
          .bindPopup(`
            <div class="popup-content">
              <b>${charity.charityname}</b><br>
              <img src="assets/charityImages/${encodeURIComponent(charity.charityimg)}" alt="Charity Image" class="popup-img">
              <p>${charity.location}</p>
            </div>
          `);
      });
  
  }
}
