import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule, MatIconModule, MatButtonModule, MatSort, MatSortModule, MatSnackBarModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import { MatDialogModule, MatNativeDateModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { DepartmentComponent } from './department/department.component';
import { ShowEmployeeComponent } from './employee/show-employee/show-employee.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { ShowDeptComponent } from './department/show-dept/show-dept.component';
import { EditDeptComponent } from './department/edit-dept/edit-dept.component';
import { AddDeptComponent } from './department/add-dept/add-dept.component';
import { EmployeeService } from './services/employee.service';
import { DepartmentService } from './services/department.service';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    DepartmentComponent,
    ShowEmployeeComponent,
    AddEmployeeComponent,
    ShowDeptComponent,
    EditDeptComponent,
    AddDeptComponent,
    EditEmployeeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule, MatIconModule, MatButtonModule,
    HttpClientModule,
    MatSortModule,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [DepartmentService, EmployeeService],
  bootstrap: [AppComponent],
  entryComponents: [AddDeptComponent, EditDeptComponent, EditEmployeeComponent, AddEmployeeComponent]
})
export class AppModule { }
