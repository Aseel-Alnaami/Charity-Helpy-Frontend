import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-alltestimonials',
  templateUrl: './alltestimonials.component.html',
  styleUrls: ['./alltestimonials.component.css']
})
export class AlltestimonialsComponent implements OnInit{

  constructor(private adminService: AdminService){}

  ngOnInit(): void {
    this.allTestimonial;
  }

  allTestimonial: any[] = [];

  getAllTestimonial(){
  this.adminService.getAllTestimonial().subscribe((data: any)  => {
    this.allTestimonial = data;
  });
}

}
