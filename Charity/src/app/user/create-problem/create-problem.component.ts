import { Component, OnInit ,Inject, ViewChild, TemplateRef} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-create-problem',
  templateUrl: './create-problem.component.html',
  styleUrls: ['./create-problem.component.css']
})
export class CreateProblemComponent implements OnInit {
  // userId!: number | null; 
  userId: string | null = null;
  username: string | null = null;
  fullname: string | null = null;
  roleId: string | null = null;

  constructor(public user: UserService, public dialog: MatDialog) { }
  showForm = false;

  ngOnInit(): void { 
    this.getUserInfo();

  }


  getUserInfo() {
    this.userId = localStorage.getItem('userid');
    this.username = localStorage.getItem('username');
    this.fullname = localStorage.getItem('Fullname');
    this.roleId = localStorage.getItem('roleid');

    console.log('User info fetched from localStorage:', {
      userId: this.userId,
      username: this.username,
      fullname: this.fullname,
      roleId: this.roleId
    });
    if (this.userId) {
      this.createForm.patchValue({ userid: this.userId });
    }
  }

  createForm: FormGroup = new FormGroup({
    userid: new FormControl('',[Validators.required]),
    problemtext: new FormControl('',[Validators.required])
  });

  saveProblem() {
    // debugger;
    console.log('Form submitted:', this.createForm.value); // Debug

    if (this.createForm.valid) {
      this.user.CreateProblem(this.createForm.value);
    } else {
      console.log('Form Invalid');
    }
  }


}