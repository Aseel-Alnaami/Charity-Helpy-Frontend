import { Component,OnInit, TemplateRef, ViewChild  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';
import { CreateUserComponent } from '../create-user/create-user.component';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  
constructor(public admin:AdminService ,public dialog:MatDialog){}
//Step five: Call the get-all method from the home service in the ngOnInit method.
ngOnInit(): void { 
  this.admin.GetAllUsers();
  }
  //Step Six: Bind the data from the course array.in html
@ViewChild('openDeleteDailog')openDeleteDailog!:TemplateRef<any>


openDeleteDialog(id: number) {
  const dialogRef = this.dialog.open(this.openDeleteDailog, {
    width: '400px', 
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result !== undefined) {
      if (result === 'yes') {
        this.admin.deleteUser(id);
        // window.location.reload();
        
      } else if (result === 'no') {
        console.log('User canceled deletion');
      }
    }
  });}

  openCreateUserDialog() {
    debugger;

    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '500px',
      disableClose: true, 
    // position: { top: '50%', left: '50%' }, 
    // panelClass: 'custom-dialog-container' 
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.admin.createUser(result);
      }
    });
}

updateForm: FormGroup = new FormGroup({
  userid: new FormControl(null),  // ✅ Ensure userid is included
  fullname: new FormControl(),
  username: new FormControl(),
  email: new FormControl(),
  password: new FormControl(),
  phone: new FormControl(),
  dateofbirth: new FormControl(),
  profilepicture: new FormControl()
});

previousData: any = {};  

@ViewChild('callUpdateDailog') callUpdateDailog!: TemplateRef<any>;

openUpdateDailog(user: any) {
  this.previousData = {
    userid: user.userid,
    fullname: user.fullname,
    username: user.username,
    email: user.email,
    password: user.password,  // Reset password for security
    phone: user.phone,
    dateofbirth: user.dateofbirth ? user.dateofbirth.split('T')[0] : '',
    profilepicture: user.profilepicture
  };

  // ✅ Use patchValue() to avoid errors
  this.updateForm.patchValue({
    userid: this.previousData.userid,
    fullname: this.previousData.fullname,
    username: this.previousData.username,
    email: this.previousData.email,
    password: this.previousData.password,  // Blank password (avoiding accidental overwrite)
    phone: this.previousData.phone,
    dateofbirth: this.previousData.dateofbirth,
    profilepicture: this.previousData.profilepicture
  });

  // ✅ Open the update dialog
  const dialogRef = this.dialog.open(this.callUpdateDailog, {
    width: '500px',
    disableClose: true,
   // position: { top: '50%', left: '50%' },
   // panelClass: 'custom-dialog-container'
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      console.log('Dialog closed with result:', result);
    }
  });
}

updateUser() {
  debugger;
  let formData = { ...this.updateForm.value };

  if (!formData.password) {
    delete formData.password;}

  console.log('Form Data before update:', formData);
  this.admin.updateUser(formData);
}


updateUserWithImage(event: Event) {
  const input = event.target as HTMLInputElement;

  if (!input.files || input.files.length === 0) {
    return;  // No file selected
  }

  let fileToUpload = input.files[0];
  const formData = new FormData();
  formData.append('file', fileToUpload, fileToUpload.name);

  this.admin.uploadAttachment(formData).subscribe(
    (response: any) => {
      console.log("API Response:", response);
      const imagePath = `assets/userImages/${response.imagename}`;
      console.log("Updated Image Path:", imagePath);

      this.updateForm.patchValue({ profilepicture: imagePath }); // Save new image path
      this.updateUser(); // Proceed with user update
    },
    (error) => {
      alert('Error uploading image.');
      console.log(error);
    }
  );
}



closeDialog(): void {
  this.dialog.closeAll();
}

}