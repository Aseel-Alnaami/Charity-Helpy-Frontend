import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-faqpage',
  templateUrl: './faqpage.component.html',
  styleUrls: ['./faqpage.component.css']
})
export class FAQPageComponent implements OnInit {

  FAQData: any[] = [];

  constructor(public admin: AdminService, public dialog: MatDialog) { }
  @ViewChild('callUpdateDailog') updateDialog!: TemplateRef<any>

  ngOnInit(): void {
    this.getall();
  }
  
  getall(){
  this.admin.GetAllFAQPage().subscribe(
    (data) => {
      this.FAQData = data;
      console.log('Data from GetAllHomePage:', data);
    },
    (error) => {
      console.error('Error loading Home page data:', error);
    }
  );
}

    openUpdateDialog(obj: any) {
      console.log(obj);
      
        this.updateForm.patchValue(obj);
        this.dialog.open(this.updateDialog, { autoFocus: true });
      
    }
  
    updateForm: FormGroup = new FormGroup({
      id: new FormControl(),
      question: new FormControl(''),
      answer: new FormControl('')
    });


  Update() {
    debugger;
    let formData = { ...this.updateForm.value };
  
    if (!formData.password) {
      delete formData.password;}
  
    console.log('Form Data before update:', formData);
    this.admin.updateFAQPage(formData);
    this.dialog.closeAll();
  }

}
