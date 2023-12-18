import { Injectable } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from "@angular/router";
import { HttpHeaders } from "@angular/common/http";

const jwtHelper = new JwtHelperService();
@Injectable({
    providedIn: 'root'
})
export class localStorageJwtHelper {
    constructor(private route: Router) {
    }
    public getHttpOptions(httpType:string) {
        let httpOptions ={}
        const token = localStorage.getItem("token");
        if (jwtHelper.isTokenExpired(token)) {
            localStorage.removeItem("token");
            alert("Hết hạn đăng nhập")
            this.route.navigate(['login']);
        }
        switch (httpType) {
            case 'frombody':
                httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ` + token
                    })
                }
              break;           
            default:
                httpOptions = {
                    headers: new HttpHeaders({                  
                        'Authorization': `Bearer ` + token
                    })
                }
                break;
          }
        
        return httpOptions;
    }

}