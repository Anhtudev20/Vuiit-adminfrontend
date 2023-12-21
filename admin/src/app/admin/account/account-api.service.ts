import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../../class/class';
import { localStorageJwtHelper } from '../../../Helper/local-storage-helper';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AccountApiService {
  private controllerName: string = "Account/";

  constructor(public http: HttpClient, private localJwtHelper: localStorageJwtHelper) { }
  addNew(account: Account) {
    const httpOptions = this.localJwtHelper.getHttpOptions("frombody");
    return this.http.post<any>(environment.apiUrl + this.controllerName + "create", account, httpOptions);
  }

  update(account: Account) {
    const httpOptions = this.localJwtHelper.getHttpOptions("frombody");
    
    return this.http.put<any>(environment.apiUrl + this.controllerName + "update", account, httpOptions);
  }

  getById(accountId: string) {
    const httpOptions = this.localJwtHelper.getHttpOptions("frombody");
    return this.http.get<any>(environment.apiUrl + this.controllerName + `getbyid/${accountId}`, httpOptions);
  }

  delete(accountId: string, personId: string) {
    const httpOptions = this.localJwtHelper.getHttpOptions("frombody");
    return this.http.delete<any>(environment.apiUrl + this.controllerName + `delete/${accountId}/${personId}`, httpOptions);
  }

  getAccountsByPage(pageNumber: number, pageSize: number) {
    const httpOptions = this.localJwtHelper.getHttpOptions("frombody");
    return this.http.get<any>(environment.apiUrl + this.controllerName + `getAccountsByPage?pageNumber=${pageNumber}&pageSize=${pageSize}`, httpOptions);
  }

  searchAccounts(searchCriteria: any, pageNumber: number, pageSize: number) {
    const httpOptions = this.localJwtHelper.getHttpOptions("frombody");
    return this.http.post<any>(environment.apiUrl + this.controllerName + `searchAccounts?pageNumber=${pageNumber}&pageSize=${pageSize}`, searchCriteria, httpOptions);
  }
}
