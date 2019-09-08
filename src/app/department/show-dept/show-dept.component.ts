import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';
import {MatDialogConfig, MatDialog, MatSnackBar} from '@angular/material';
import { EditDeptComponent } from '../edit-dept/edit-dept.component';
import {AddDeptComponent} from '../add-dept/add-dept.component';

@Component({
  selector: 'app-show-dept',
  templateUrl: './show-dept.component.html',
  styleUrls: ['./show-dept.component.css']
})
export class ShowDeptComponent implements OnInit {

  constructor(private service: DepartmentService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
                //3. after adding department page should refresh and dept name should be added so call the method from add dept
                this.service.listen().subscribe((m: any) => {
                  console.log(m);
                  this.refreshDeeptList();
                })
               }

  listData : MatTableDataSource<any>;
  displayedColumns :  string[] = ['options', 'deptId', 'deptName'] 
  //for sorting
  @ViewChild(MatSort, null) sort: MatSort;

  ngOnInit() {
    this.refreshDeeptList();
  }

  refreshDeeptList(){
    // var dummyData = [{deptId:1, deptName:"IT"},
    //                 { deptId:2, deptName:"CS"}]
    // this.listData = new MatTableDataSource(dummyData);
    this.service.getDepartmentList().subscribe(data => {
      this.listData = new MatTableDataSource(data);
      console.log(data);
      this.listData.sort = this.sort;
    });
  }
  //for sorting
  applyFilter(value : string){
    this.listData.filter = value.trim().toLocaleLowerCase();
  }

  addDepartment(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(AddDeptComponent, dialogConfig);

  }

  //Delete the department
  onDelete(id: number){
    if(confirm('Are you sure you want to delete?')) {
      this.service.deleteDepartment(id).subscribe(res => {
        this.refreshDeeptList();
        this.snackBar.open(res['message'], '', {
          duration: 5000,
          verticalPosition: 'top'
        });
      });
    }
  }
  //update department
  onEdit(dept: Department){
    this.service.formData = dept;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(EditDeptComponent, dialogConfig);
  }
}
