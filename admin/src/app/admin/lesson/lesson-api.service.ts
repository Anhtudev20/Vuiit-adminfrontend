import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lesson } from '../../class/class';  // Make sure to import the correct class
import { localStorageJwtHelper } from '../../../Helper/local-storage-helper';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LessonApiService {
  private controllerName: string = "Lesson/";

  constructor(public http: HttpClient, private localJwtHelper: localStorageJwtHelper) { }

  insertLesson(lesson: Lesson) {
    const httpOptions = this.localJwtHelper.getHttpOptions("frombody");
    return this.http.post<any>(environment.apiUrl + this.controllerName + "insert", lesson, httpOptions);
  }

  updateLesson(lesson: Lesson) {
    const httpOptions = this.localJwtHelper.getHttpOptions("frombody");
    return this.http.put<any>(environment.apiUrl + this.controllerName + "update", lesson, httpOptions);
  }

  deleteLesson(lessonId: string) {
    const httpOptions = this.localJwtHelper.getHttpOptions("frombody");
    return this.http.delete<any>(environment.apiUrl + this.controllerName + `delete/${lessonId}`, httpOptions);
  }

  getLessonsByPage(id: any, pageNumber: number, pageSize: number) {
    const httpOptions = this.localJwtHelper.getHttpOptions("frombody");
    return this.http.get<any>(environment.apiUrl + this.controllerName + `getByPage?courseId=${id}&pageNumber=${pageNumber}&pageSize=${pageSize}`, httpOptions );
  }
  getByLessonId(lessonId: string) {
    const httpOptions = this.localJwtHelper.getHttpOptions("frombody");
    return this.http.get<any>(environment.apiUrl + this.controllerName + `getByLessonId/${lessonId}`, httpOptions);
  }
  searchLessonsByCourseIdAndName(searchCriteria: any, pageNumber: number, pageSize: number) {
    const httpOptions = this.localJwtHelper.getHttpOptions("frombody");
    return this.http.post<any>(environment.apiUrl + this.controllerName + `searchByCourseIdAndName?pageNumber=${pageNumber}&pageSize=${pageSize}`, searchCriteria, httpOptions);
  }
}
