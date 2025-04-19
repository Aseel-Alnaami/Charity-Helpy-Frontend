import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  newUser = {
    fullname: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    dateofbirth: '',
    profilepicture: '',
    roleid:2
  };
  // UploadImage(file:any)
  //   {
  //     if(file.length==0)
  //     return ; 
  //     let fileToUpload=<File>file[0];
  //     const formDate=new FormData();
  //     formDate.append('file',fileToUpload,fileToUpload.name);
  //     debugger
  //     this.admin.uploadAttachment(formDate);
  //   }

  UploadImage(file: any) {
    if (file.length === 0) return;
    let fileToUpload = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.admin.uploadAttachment(formData).subscribe(
      (response: any) => {
        console.log("API Response:", response);
        this.newUser.profilepicture = 'assets/userImages/' + response.imagename;
        console.log("img path sAVED", this.newUser.profilepicture);
      },
      (error) => {
        alert('No imagename found in the respons');
        console.log(error);
      }
    );
  }

  constructor(
    public dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private admin: AdminService
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }


  createUser(): void {
    this.dialogRef.close(this.newUser); // Pass data back to parent
  }
}