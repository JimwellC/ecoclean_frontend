import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FilterByTypePipe } from '../filter-by-type.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    FilterByTypePipe
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  activePanel = 'activities';

  newItem = {
    date: 0,
    title: '',
    desc: '',
    time: '',
    dateObj: null
  };

  events: any[] = [];
  messages: any[] = [];
  selectedMessage: any = null;
  filterType: string = ''; // '' = All, or 'volunteer' / 'report'

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchEvents();
    this.fetchMessages();
  }

  // Fetch events
  fetchEvents() {
    this.http.get<any[]>('http://localhost:3000/api/events').subscribe({
      next: data => (this.events = data),
      error: err => console.error('Failed to fetch events:', err)
    });
  }

  // Fetch volunteer and report messages
  fetchMessages() {
    this.http.get<any[]>('http://localhost:3000/api/messages').subscribe({
      next: data => (this.messages = data),
      error: err => console.error('Failed to fetch messages:', err)
    });
  }

  // Add new event
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

    this.http.post('http://localhost:3000/api/events', payload).subscribe({
      next: () => {
        this.fetchEvents();
        this.newItem = { date: 0, title: '', desc: '', time: '', dateObj: null };
      },
      error: err => console.error('Failed to add event:', err)
    });
  }

  // Delete entire event group
  deleteEventGroup(eventId: string) {
    if (confirm('Are you sure you want to delete this entire event group?')) {
      this.http.delete(`http://localhost:3000/api/events/${eventId}`).subscribe({
        next: () => this.fetchEvents(),
        error: err => console.error('Failed to delete event group:', err)
      });
    }
  }

  // View full message (with photo)
  viewFullMessage(id: string) {
    this.http.get<any>(`http://localhost:3000/api/messages/${id}`).subscribe({
      next: data => this.selectedMessage = data,
      error: err => console.error('Failed to load full message:', err)
    });
  }

  logout() {
    localStorage.removeItem('isAdminLoggedIn');
    this.router.navigate(['/admin-login']);
  }

  // Close modal popup
  closeModal() {
    this.selectedMessage = null;
  }
}
