import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) {}

  submitVolunteerForm(data: any, photo: File) {
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('message', data.message);
    formData.append('interest', data.interest);
    return this.http.post(`${environment.apiUrl}/messages/volunteer`, formData);
  }


  submitReportForm(data: any, file: File) {
    const formData = new FormData();
    formData.append('type', data.type);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('description', data.description);
    formData.append('photo', file);

    return this.http.post(`${environment.apiUrl}/messages/report`, formData);
  }

}
