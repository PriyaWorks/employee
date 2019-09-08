import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import { DepartmentService } from 'src/app/services/department.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material'; 

@Component({
  selector: 'app-edit-dept',
  templateUrl: './edit-dept.component.html',
  styleUrls: ['./edit-dept.component.css']
})
export class EditDeptComponent implements OnInit {

  constructor(public dialogBox: MatDialogRef<EditDeptComponent>,
                private service: DepartmentService,
                private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onClose(){
    this.dialogBox.close();
    this.service.filter('Register Click');
  }

  onEditDept(form: NgForm){
    this.service.editDepartment(form.value).subscribe(res => {
      this.snackBar.open(res.toString(), ' ', {
        duration: 5000,
        verticalPosition: 'top'
      });
    });
  }
}
