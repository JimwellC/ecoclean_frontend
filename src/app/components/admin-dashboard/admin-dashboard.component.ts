import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, FormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
})
export class AdminDashboardComponent implements OnInit{
  activePanel = 'activities';

  newEvent = { month: ''};
  newItem = {
    date: 0,
    title: '',
    desc: '',
    time: '',
    dateObj: null // new field
  };

  events: any[] = [];
  messages: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchEvents();
    // this.fetchMessages();
  }

  fetchEvents() {
    this.http.get<any[]>('http://localhost:3000/api/events').subscribe((data) => {
      this.events = data;
    });
  }

  // fetchMessages() {
  //   this.http.get<any[]>('http://localhost:4200/api/messages').subscribe((data) => {
  //     this.messages = data;
  //   });
  // }

  addEvent() {
    if (!this.newItem.dateObj) return;

    const selectedDate = new Date(this.newItem.dateObj);

    const payload = {
      month: selectedDate.toLocaleString('default', { month: 'long' }) + ' ' + selectedDate.getFullYear(),
      item: {
        date: selectedDate.getDate(),
        title: this.newItem.title,
        desc: this.newItem.desc,
        time: this.newItem.time
      }
    };

    this.http.post('http://localhost:3000/api/events', payload).subscribe(() => {
      this.fetchEvents();
      this.newItem = { date: 0, title: '', desc: '', time: '', dateObj: null };
    });
  }

  deleteEventGroup(eventId: string) {
    if (confirm('Are you sure you want to delete this entire event group?')) {
      this.http.delete(`http://localhost:3000/api/events/${eventId}`).subscribe(() => {
        this.fetchEvents();
      });
    }
  }
}
