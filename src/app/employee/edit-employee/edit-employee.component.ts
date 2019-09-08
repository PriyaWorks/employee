import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material'; 

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  constructor(public dialogBox: MatDialogRef<EditEmployeeComponent>,
    private service: EmployeeService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onClose(){
    this.dialogBox.close();
    this.service.filter('Register Click');
  }

  onEditEmp(form){
    this.service.editEmployee(form.value).subscribe(res => 
      {

        
      this.snackBar.open(res['message'], ' ', {
        duration: 5000,
        verticalPosition: 'top'
      });
    });
  }
  }


