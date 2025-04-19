import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';


@Component({
  selector: 'app-sent-contact',
  templateUrl: './sent-contact.component.html',
  styleUrls: ['./sent-contact.component.css']
})
export class SentContactComponent  implements OnInit {
  @ViewChild('CallDelteDialog') DeleteDialog!:TemplateRef<any>;

  sendContacts: any[] = []; // Holds only contacts with status "send"

  constructor(public admin: AdminService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.admin.getallIcontactus().subscribe((data: any[]) => {
      this.sendContacts = data.filter(contact => contact.status === 'send');
    });
  }



   deleteContact(id: number) {
    this.admin.deleteContact(id).subscribe(
       () => {
         alert('The contact was deleted successfully');
        this.sendContacts = this.sendContacts.filter(contact => contact.contactid !== id); // Remove from UI
       },
       err => {
         console.log('Something went wrong', err);
       }
     );
   }

  // openDialog(id: number) {
  //   const dialogRef = this.dialog.open(this.DeleteDialog);
  //  dialogRef.afterClosed().subscribe((result) => {
  //   if (result === 'yes') {
  //      this.deleteContact(id);
  //      }
  //    });
  // }
  openDialog(contactId: number): void {
    const dialogRef = this.dialog.open(this.DeleteDialog);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        this.deleteContact(contactId);
      }
    });
  }
  }