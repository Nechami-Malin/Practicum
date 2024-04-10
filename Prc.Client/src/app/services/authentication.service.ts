import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }
 public isAdmin$!:boolean

   login(userLogin: {}): Observable<any> {
     let response= this.http.post('https://localhost:7124/api/Authentication/login', userLogin)
    return response;
  }
}