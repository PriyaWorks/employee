import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import {MatDialogConfig, MatDialog, MatSnackBar} from '@angular/material';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import {AddEmployeeComponent} from '../add-employee/add-employee.component';

@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.component.html',
  styleUrls: ['./show-employee.component.css']
})
export class ShowEmployeeComponent implements OnInit {

  constructor(private service: EmployeeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
      //3. after adding department page should refresh and dept name should be added so call the method from add dept
      this.service.listen().subscribe((m: any) => {
        console.log(m);
        this.refreshEmpList();
      })
     }

     listData : MatTableDataSource<any>;
     displayedColumns :  string[] = ['options', 'empId', 'fk_deptId', 'empName', 'mailId', 'DOJ'] 
     //for sorting
     @ViewChild(MatSort, null) sort: MatSort;
   
     ngOnInit() {
       this.refreshEmpList();
     }

     refreshEmpList(){
      this.service.getEmployeeList().subscribe(data => {
        this.listData = new MatTableDataSource(data);
        console.log(data);
        this.listData.sort = this.sort;
      });
    }
    //for sorting
    applyFilter(value : string){
      this.listData.filter = value.trim().toLocaleLowerCase();
    }

    addEmployee(){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "70%";
      this.dialog.open(AddEmployeeComponent, dialogConfig);
    }

    onDelete(id: number){
      if(confirm('Are you sure you want to delete?')) {
        this.service.deleteEmployee(id).subscribe(res => {
          this.refreshEmpList();
          this.snackBar.open(res.toString(), '', {
            duration: 5000,
            verticalPosition: 'top'
          });
        });
      }
    }
    //update department
    onEdit(emp: Employee){
      this.service.formData = emp;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "70%";
      this.dialog.open(EditEmployeeComponent, dialogConfig);
    }
}
