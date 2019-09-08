import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import {Department} from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  formData : Employee;
  finalURL : string;
  readonly Url = "http://localhost:3000";

  getEmployeeList() : Observable<Employee[]> {
    return this.http.get<Employee[]>(this.Url + '/employees');
  }

  addEmployee(emp : Employee){
    return this.http.post(this.Url + '/employees/create', emp);
  }
  
  deleteEmployee(id: number){
    return this.http.delete(this.Url + '/employees/delete/' + id);
  }

  editEmployee(emp: Employee){
    this.finalURL = this.Url + '/employees/edit/' + emp.empId;
    console.log(this.finalURL);
    console.log(emp);
    return this.http.put(this.finalURL, emp);
  }
  //to get department id in employee form
  getDeptDropDownValues() : Observable<any>{
    return this.http.get<Department[]>(this.Url + '/departments');
  }
  //1. after adding department page should refresh and dept name should be added
  private _listners = new Subject<any>();
  listen(): Observable<any> {
    return this._listners.asObservable();
  }
  filter(filterBy : string){
    this._listners.next(filterBy);
  }
}
