import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatCard, MatDivider],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent implements OnInit {
  events: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents() {
    this.http.get<any[]>(`${environment.apiUrl}/events`).subscribe((data) =>{
      const grouped: any = {};

      // Group events by month
      data.forEach(event => {
        if (!grouped[event.month]) {
          grouped[event.month] = [];
        }
        grouped[event.month].push(event.item);
      });

      // Convert to format compatible with your existing HTML
      this.events = Object.entries(grouped).map(([month, items]) => ({
        month,
        items
      }));
    });
  }
}
