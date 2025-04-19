import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {

  user: any;  // Assuming 'user' contains the existing user data

  constructor(
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Assign the passed data to the user object
    this.user = { ...data };  // Assume data contains the user data
  }

  // This method will be called when the form is submitted
  updateUser() {
    // Perform the update logic here (e.g., call a service to update the user)
    console.log("User data updated:", this.user);
    // Close the dialog after updating
    this.dialogRef.close(this.user);
  }

  closeDialog() {
    this.dialogRef.close();}
//   }
// }
// openUpdateUserDialog(user: any): void {
//   const dialogRef = this.dialog.open(UpdateUserComponent, {
//     width: '400px',
//     data: user  // Pass the existing user data to the dialog
//   });

//   dialogRef.afterClosed().subscribe(result => {
//     if (result) {
//       // Do something with the updated user data (e.g., refresh the list)
//       console.log('Updated User:', result);
//     }
//   });
// 
  }