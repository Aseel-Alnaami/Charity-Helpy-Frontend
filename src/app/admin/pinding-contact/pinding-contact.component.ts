import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';


@Component({
  selector: 'app-pinding-contact',
  templateUrl: './pinding-contact.component.html',
  styleUrls: ['./pinding-contact.component.css']
})
export class PindingContactComponent implements OnInit {
  pendingContacts: any[] = []; // Holds only pending contacts

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getallIcontactus().subscribe((data: any[]) => {
      this.pendingContacts = data.filter(contact => contact.status === 'Pending'); // Filter pending contacts
    });
  }

  deleteContact(id: number) {
    this.adminService.deleteContact(id).subscribe(() => {
      this.pendingContacts = this.pendingContacts.filter(contact => contact.id !== id);
      alert('Contact deleted successfully');
    });
  }

 

  selectedContact: any = null;
replyMessage: string = '';

replyTo(contact: any) {
  this.selectedContact = contact;
  this.replyMessage = '';
}

sendReply() {
  if (this.replyMessage.trim()) {
    this.adminService.replyToContact(this.selectedContact.contactid, this.replyMessage).subscribe({
      next: () => {
        this.selectedContact.status = 'Sent';
        alert('Reply sent and status updated');
        this.cancelReply();
      },
      error: (err) => {
        console.error('Error occurred:', err);
        alert('Failed to send reply.');
      }
    });
  }
}

cancelReply() {
  this.selectedContact = null;
  this.replyMessage = '';
}


}
