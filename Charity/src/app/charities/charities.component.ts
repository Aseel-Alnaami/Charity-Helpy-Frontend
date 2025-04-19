import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../Services/admin.service';
import { MapComponent } from '../user/map/map.component';

@Component({
  selector: 'app-charities',
  templateUrl: './charities.component.html',
  styleUrls: ['./charities.component.css']
})
export class CharitiesComponent implements OnInit {
  charities: any[] = [];
  filteredCharities: any[] = [];
  searchQuery: string = '';
  @ViewChild(MapComponent) mapComponent!: MapComponent;

  constructor(public admin: AdminService) { }
  userId: string | null = null;

  ngOnInit(): void {
    this.getAllCharities();
    this.getUserInfo();

  }

  
  getUserInfo() {
    this.userId = localStorage.getItem('userid');}
    
    
  
selectedCharityLocation: { lat: number, lng: number } | null = null;

onSearch(charity: any) {
  this.selectedCharityLocation = {
    lat: charity.latitude,
    lng: charity.longitude
  };
}

setDonationId(charityId: number) {
  localStorage.setItem('charityId', charityId.toString());
}


  getAllCharities() {
    this.admin.GetAllCharities().subscribe((data: any[]) => {
      this.charities = data;
      this.filteredCharities = data.filter((charities) => charities.status === 'Paid' && charities.currentdonation < charities.target && charities.userid != this.userId);

      console.log(this.charities);
    });
  }

  searchCharity() {
    if (this.searchQuery) {
      this.filteredCharities = this.charities
        .filter((charity) => charity.status === 'Paid' && charity.currentdonation < charity.target && charity.userid != this.userId) 
        .filter(charity =>
          charity.charityname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          charity.category?.categoryname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          charity.description.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        if (this.filteredCharities.length === 1) {
          const charity = this.filteredCharities[0];
          this.selectedCharityLocation = {
            lat: charity.latitude,
            lng: charity.longitude
          };
        }
    
      } else {
        this.filteredCharities = this.charities.filter(charity => charity.status === 'Paid' && charity.currentdonation < charity.target && charity.userid != this.userId);
        this.selectedCharityLocation = null;
      }
    } 

  }
