import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignInRequest } from '../class/class';
import { environment } from '../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class LoginApiService {
  constructor(public http: HttpClient) { }
  login(acc:SignInRequest) {
    return this.http.post<any>(environment.apiUrl+"Account/signin",acc);
  }
}
