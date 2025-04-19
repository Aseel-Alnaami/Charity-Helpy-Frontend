import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-problems',
  templateUrl: './manage-problems.component.html',
  styleUrls: ['./manage-problems.component.css']
})
export class ManageProblemsComponent implements OnInit {

  constructor(public admin: AdminService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.admin.GetAllProblems();
  }

  @ViewChild('callDeletDailog') deleteDialog!: TemplateRef<any>;
  @ViewChild('callUpdateDailog') updateDialog!: TemplateRef<any>;

  
  // ---------------------------
  // Delete Dialog
  // ---------------------------
  openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(this.deleteDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'yes') {
        this.admin.DeleteProblem(id);
      }
    });
  }

  // ---------------------------
  // Update Dialog 
  // ---------------------------
  openUpdateDialog(obj: any) {
      this.updateForm.patchValue(obj);
      this.dialog.open(this.updateDialog, { autoFocus: true });
  }

  // ---------------------------
  // Update Problem Form 
  // ---------------------------
  updateForm: FormGroup = new FormGroup({
    problemid: new FormControl(),
    userid: new FormControl(''),
    problemtext: new FormControl(''),
    reportdate: new FormControl(''),
    status: new FormControl('',Validators.required)
  });

  // ---------------------------
  // Update Button Action
  // ---------------------------
  Update() {
    this.admin.UpdateProblem(this.updateForm.value);
    this.dialog.closeAll();
  }
}
