import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  HomePage: any[] = [];

  constructor(public admin: AdminService, public dialog: MatDialog) { }
  @ViewChild('callUpdateDailog') updateDialog!: TemplateRef<any>

  ngOnInit(): void {
    this.getall();
  }
  
  getall(){
  this.admin.GetAllHomePage().subscribe(
    (data) => {
      this.HomePage = data;
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
      title1: new FormControl(''),
      title2: new FormControl(''),
      heroimg: new FormControl('')
    });


  Update() {
    debugger;
    let formData = { ...this.updateForm.value };
  
    if (!formData.password) {
      delete formData.password;}
  
    console.log('Form Data before update:', formData);
    this.admin.updateHomePage(formData);
    this.dialog.closeAll();
  }

  updateHomeWithImage(event: Event) {
    const input = event.target as HTMLInputElement;
  
    if (!input.files || input.files.length === 0) return;
  
    let fileToUpload = input.files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
  
    this.admin.uploadHomePageImage(formData).subscribe(
      (response: any) => {
        console.log("Image uploaded:", response);
        const imageName = response.imagename;
  
        // ربط الصورة بالفورم
        this.updateForm.patchValue({ heroimg: imageName });
      },
      (error) => {
        console.error('Error uploading image:', error);
      }
    );
  }

}
