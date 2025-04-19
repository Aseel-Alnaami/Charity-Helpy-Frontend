import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProblemComponent } from '../create-problem/create-problem.component';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent implements OnInit {
  constructor(private dialog: MatDialog) {}
  ngOnInit() {
    
  }
  openCreateDialog() {
    this.dialog.open(CreateProblemComponent);
  }
}
