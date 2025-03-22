import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) {}

  submitVolunteerForm(data: any, file: File) {
    const formData = new FormData();
    formData.append('interest', data.interest);
    formData.append('name', data.name);
    formData.append('message', data.message);
    formData.append('photo', file);

    return this.http.post('http://localhost:3000/api/messages/volunteer', formData);
  }

  submitReportForm(data: any, file: File) {
    const formData = new FormData();
    formData.append('type', data.type);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('description', data.description);
    formData.append('photo', file);

    return this.http.post('http://localhost:3000/api/messages/report', formData);
  }

}
