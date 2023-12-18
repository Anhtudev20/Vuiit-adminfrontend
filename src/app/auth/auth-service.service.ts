import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  constructor() {}
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    
    return !jwtHelper.isTokenExpired(token);
  }
  
}