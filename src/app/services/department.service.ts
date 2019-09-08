import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Department } from '../models/department.model';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http:HttpClient) { }

  formData : Department;

  readonly Url = "http://localhost:3000";
  finalURL : string;

  getDepartmentList() : Observable<Department[]> {
    return this.http.get<Department[]>(this.Url + '/departments');
  }

  addDepartment(dept : Department){
    return this.http.post(this.Url + '/departments/create', dept);
  }
  
  deleteDepartment(id: number){
    return this.http.delete(this.Url + '/departments/delete/' + id);
  }

  editDepartment(dept: Department){
    this.finalURL = this.Url + '/departments/edit/' + dept.deptId;
    return this.http.put(this.finalURL, dept);
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
