import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../../class/class';
import { localStorageJwtHelper } from '../../../Helper/local-storage-helper';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CourseApiService {
  private controllerName: string = "Course/";

  constructor(public http: HttpClient, private localJwtHelper: localStorageJwtHelper) { }

  addNew(course: Course) {
    const httpOptions = this.localJwtHelper.getHttpOptions("frombody");
    return this.http.post<any>(environment.apiUrl + this.controllerName + "create", course, httpOptions);
  }

  update(course: Course) {
    const httpOptions = this.localJwtHelper.getHttpOptions("frombody");
    return this.http.put<any>(environment.apiUrl + this.controllerName + "update", course, httpOptions);
  }

  getById(courseId: string) {
    const httpOptions = this.localJwtHelper.getHttpOptions("frombody");
    return this.http.get<any>(environment.apiUrl + this.controllerName + `getbyid/${courseId}`, httpOptions);
  }

  delete(courseId: string) {
    const httpOptions = this.localJwtHelper.getHttpOptions("frombody");
    return this.http.delete<any>(environment.apiUrl + this.controllerName + `delete/${courseId}`, httpOptions);
  }

  getCoursesByPage(pageNumber: number, pageSize: number) {
    const httpOptions = this.localJwtHelper.getHttpOptions("frombody");
    return this.http.get<any>(environment.apiUrl + this.controllerName + `getCoursesByPage?pageNumber=${pageNumber}&pageSize=${pageSize}`, httpOptions);
  }

  searchCourses(searchCriteria: any, pageNumber: number, pageSize: number) {
    const httpOptions = this.localJwtHelper.getHttpOptions("frombody");
    return this.http.post<any>(environment.apiUrl + this.controllerName + `searchCourses?pageNumber=${pageNumber}&pageSize=${pageSize}`, searchCriteria, httpOptions);
  }
}
