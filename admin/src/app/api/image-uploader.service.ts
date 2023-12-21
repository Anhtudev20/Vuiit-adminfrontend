import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) { }

  uploadFile(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(`${this.apiUrl}FileUpload/upload`, formData);
  }
}