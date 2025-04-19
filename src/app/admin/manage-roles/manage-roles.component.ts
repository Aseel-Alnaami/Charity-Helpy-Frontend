import { Component, createComponent, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContactusComponent } from 'src/app/contactus/contactus.component';
import { AdminService } from 'src/app/Services/admin.service';
import { CreaeRoleComponent } from '../creae-role/creae-role.component';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.css']
})



export class ManageRolesComponent implements OnInit {
  ngOnInit(): void {
    this.admin.getallRoles();

     }


    constructor(public admin:AdminService ,private router:Router,private dialog :MatDialog){  
    }
    ctrateRole(){
          this.router.navigate(['']);
        }

      newrole(){
            this.router.navigate(['admin/creatrole']);
      }

      openCreateDialog() {
            const dialogRef = this.dialog.open(CreaeRoleComponent);
          }

} 