import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {

  ContactPage: any[] = [];

  constructor(public admin: AdminService, public dialog: MatDialog) { }
  @ViewChild('callUpdateDailog') updateDialog!: TemplateRef<any>

  ngOnInit(): void {
    this.getall();
  }
  
  getall(){
  this.admin.GetAllContactPage().subscribe(
    (data) => {
      this.ContactPage = data;
      console.log('Data from GetAllContactPage:', data);
    },
    (error) => {
      console.error('Error loading contact page data:', error);
    }
  );
}
  // ---------------------------
    // Update Dialog 
    // ---------------------------
    openUpdateDialog(obj: any) {
      console.log(obj);
      
        this.updateForm.patchValue(obj);
        this.dialog.open(this.updateDialog, { autoFocus: true });
      
    }
  
    // ---------------------------
    // Update Charity Form
    // ---------------------------
    updateForm: FormGroup = new FormGroup({
      id: new FormControl(),
      title1: new FormControl(''),
      title2: new FormControl(''),
      location: new FormControl(''),
      phonenumber: new FormControl(''),
      email: new FormControl(''),
      heroimg: new FormControl('')
    });

    // ---------------------------
  // Update Button Action
  // ---------------------------
  // Update() {
  //   this.admin.updateContactPage(this.updateForm.value); 
  //   this.dialog.closeAll();
  // }
  Update() {
    debugger;
    let formData = { ...this.updateForm.value };
  
    if (!formData.password) {
      delete formData.password;}
  
    console.log('Form Data before update:', formData);
    this.admin.updateContactPage(formData);
    this.dialog.closeAll();
  }

  updateContactWithImage(event: Event) {
    const input = event.target as HTMLInputElement;
  
    if (!input.files || input.files.length === 0) return;
  
    let fileToUpload = input.files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
  
    this.admin.uploadContactPageImage(formData).subscribe(
      (response: any) => {
        console.log("Image uploaded:", response);
        const imageName = response.imagename;
  
        // ربط الصورة بالفورم
        this.updateForm.patchValue({ heroimg: imageName });
  
        // تحديث الـ ContactPage
        // this.Update();
      },
      (error) => {
        console.error('Error uploading image:', error);
      }
    );
  }
}
