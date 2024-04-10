import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../components/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }
  getEmployees():Observable<Employee[]>{
    return this.http.get<Employee[]>('https://localhost:7054/api/Employee');
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`https://localhost:7054/api/Employee/${id}`)
  }

  addEmployee(e:Employee):Observable<any>{
    return this.http.post('https://localhost:7054/api/Employee/',e);
  }
  
  updateEmployee(id:number,employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`https://localhost:7054/api/Employee/${id}`, employee);
  }

  deleteEmployee(id: number):Observable<any>{
    return this.http.delete<Employee>(`https://localhost:7054/api/Employee/${id}`)
  }
}
