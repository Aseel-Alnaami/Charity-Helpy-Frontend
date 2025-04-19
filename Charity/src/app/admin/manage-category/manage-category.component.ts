import { Component,OnInit, TemplateRef, ViewChild  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ShearedModule } from 'src/app/sheared/sheared.module';
@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit {
  constructor(public admin:AdminService ,public dialog:MatDialog){}

  ngOnInit(): void { 
    this.admin.GetAllCategory();
    }

    @ViewChild('openDeleteDailog')openDeleteDailog!:TemplateRef<any>


    openDeleteDialog(id: number) {
      const dialogRef = this.dialog.open(this.openDeleteDailog, {
        width: '400px', 
      });
    
      dialogRef.afterClosed().subscribe((result) => {
        if (result !== undefined) {
          if (result === 'yes') {
            this.admin.deleteCategory(id);
            // window.location.reload();
            
          } else if (result === 'no') {
            console.log('Category canceled deletion');
          }
        }
      });}


      @ViewChild('createCategoryDialog') createCategoryDialog!: TemplateRef<any>;

  newCategory = { categoryname: '', profit: '' }; // Store form input data


  openCreateCategoryDialog() {
    const dialogRef = this.dialog.open(this.createCategoryDialog, {
      width: '500px',
      disableClose: true,
      position: { top: '10%' },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createCategory();
      }
    });
  }

  createCategory() {
    if (this.newCategory.categoryname && this.newCategory.profit) {
      this.admin.createCategory(this.newCategory);
      this.newCategory = { categoryname: '', profit: '' }; // Reset form after creation
    }
  }

  closeDialog() {
    this.dialog.closeAll(); // Close all open dialogs
  }


  @ViewChild('callUpdateDailog') callUpdateDailog!: TemplateRef<any>;

  updateForm: FormGroup = new FormGroup({
    categoryid: new FormControl(null),  
    categoryname: new FormControl(''),  
    profit: new FormControl(''),  
  });


  openUpdateDailog(category: any) {
    this.updateForm.patchValue({
      categoryid: category.categoryid,
      categoryname: category.categoryname,
      profit: category.profit,
    });

    const dialogRef = this.dialog.open(this.callUpdateDailog, {
      width: '500px',
      disableClose: true,
      position: { top: '10%' },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateCategory();
      }
    });
  }

  updateCategory() {
    if (!this.updateForm.valid) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = this.updateForm.value;
    console.log('Form Data before update:', formData);

    this.admin.updateCategory(formData);
    this.dialog.closeAll(); // Close dialog after updating
  }






}
