import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialogRef, MatSort, MatTableDataSource} from '@angular/material';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';  
import { DepartmentService } from 'src/app/services/department.service';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(public dialogBox: MatDialogRef<AddEmployeeComponent>,
              private service: EmployeeService,
              private snackBar: MatSnackBar,
              private deptService: DepartmentService) { }

  deptList = [];
    //for sorting
  @ViewChild(MatSort, null) sort: MatSort;
  public dropdownList: Array<string> = [];
  ngOnInit() {
    this.deptService.getDepartmentList().subscribe(data => {
      this.deptList = data;
      console.log(data);
      // this.deptList.sort = this.sort;
    });
    this.resetForm();
    //this.dropdownRefresh();
  }

  // dropdownRefresh(){
  //   this.service.getDeptDropDownValues().subscribe(data => {
  //     console.log(data);
  //     data.forEach(element => {
  //       this.dropdownList.push(element["deptName"]);
  //     });
  //   })
  // }

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
        empId: 0,
        fk_deptId: 0,
        empName: '',
        mailId: '',
        DOJ: null,
        deptName: ''
    }
  }

  onSaveEmp(form){
    this.service.addEmployee(form.value).subscribe(res => {
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
