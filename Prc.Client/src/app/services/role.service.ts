import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../components/models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http:HttpClient) { }
  getRoles():Observable<Role[]>{
    return this.http.get<Role[]>('https://localhost:7054/api/Role');
  }
}
