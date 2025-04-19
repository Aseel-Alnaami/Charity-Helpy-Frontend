import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-manage-contactus',
  templateUrl: './manage-contactus.component.html',
  styleUrls: ['./manage-contactus.component.css']
})


export class ManageContactusComponent implements OnInit {
  @ViewChild('CallDelteDialog') DeleteDialog!: TemplateRef<any>;

  allContacts: any[] = []; // Holds all contacts
  sendContacts: any[] = []; // Holds only contacts with status "send"


  constructor(public admin: AdminService, public dialog: MatDialog) {}



  ngOnInit(): void {
    this.admin.getallIcontactus().subscribe((data: any[]) => {
      this.allContacts = data; // Store all contacts
      this.sendContacts = data.filter(contact => contact.status === 'send'); // Filter only "send" status contacts
    });
  }

  

  
  deletecontact(id: number) {
    this.admin.deleteContact(id).subscribe(
      (resp: any) => {
        console.log('Deleted');
        alert('The contact Deleted Successfully');
        // Remove the deleted contact from the local array
        this.admin.ContactUs = this.admin.ContactUs.filter((contact: { contactid: any; }) => contact.contactid !== id);
      },
      err => {
        console.log('Something went wrong');
      }
    );
    window.location.reload();
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(this.DeleteDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        if (result === 'yes') {
          this.deletecontact(id);
        } else if (result === 'no') {
          console.log('Thank you !!');
        }
      }


     
    });

  
  }
}