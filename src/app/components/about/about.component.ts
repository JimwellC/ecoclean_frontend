import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  imports: [CommonModule, RouterModule]
})
export class AboutComponent implements OnInit {
  volunteers: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>(`${environment.apiUrl}/messages?type=volunteer&status=accepted`)
    .subscribe({
        next: (data) => {
          this.volunteers = data;
        },
        error: (err) => {
          console.error('Failed to fetch volunteers:', err);
        }
      });
  }
}
