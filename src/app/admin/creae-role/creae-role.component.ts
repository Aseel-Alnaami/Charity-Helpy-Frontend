import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-creae-role',
  templateUrl: './creae-role.component.html',
  styleUrls: ['./creae-role.component.css']
})
export class CreaeRoleComponent {
  constructor(private admin:AdminService){}
  createForm: FormGroup = new FormGroup({
    rolename: new FormControl('', Validators.required)
  });

  onSubmit() {

        this.admin.CreateRole(this.createForm.value);

}
  } 