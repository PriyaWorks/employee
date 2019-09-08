import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MatSnackBarModule} from '@angular/material';
import { DepartmentService } from 'src/app/services/department.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';  

@Component({
  selector: 'app-add-dept',
  templateUrl: './add-dept.component.html',
  styleUrls: ['./add-dept.component.css']
})
export class AddDeptComponent implements OnInit {

  constructor(public dialogBox: MatDialogRef<AddDeptComponent>,
              private service: DepartmentService,
              private snackBar: MatSnackBar) {
               }

  ngOnInit() {
    this.resetForm();
  }

  onClose(){
    this.dialogBox.close();
    //2. after adding department page should refresh and dept name should be added so call the method from sept service
    this.service.filter('Register click');
  }
  //display dept name
  resetForm(form?: NgForm){
    if(form != null)
      form.resetForm();
      this.service.formData = {
        deptId: 0,
        deptName: ''
    }
  }
  onSaveDept(form: NgForm){
    this.service.addDepartment(form.value).subscribe(res => {
      this.resetForm(form);
      //Snack bar to display confirmation for dept added
      this.snackBar.open(res['message'], '', {
        duration: 5000,
        verticalPosition: 'top'
      });
    }) 
    console.log(form.value);
  }

}
