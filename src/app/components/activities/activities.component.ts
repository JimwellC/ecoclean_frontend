import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-activities',
  imports: [MatCard, CommonModule, MatDivider],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent {
  events = [
    {
      month: 'March 2025',
      items: [
        { date: 15, title: 'Some Title Here', time: '10:30 AM' },
        { date: 22, title: 'Some Title Here', time: '9:00 AM' },
        { date: 31, title: 'Some Title Here', time: '10:30 AM' },
      ],
    },
    {
      month: 'April 2025',
      items: [
        { date: 8, title: 'Some Title Here', time: '10:30 AM' },
        { date: 18, title: 'Some Title Here', time: '9:00 AM' },
        { date: 28, title: 'Some Title Here', time: '10:30 AM' },
      ],
    },
    {
      month: 'May 2025',
      items: [
        { date: 5, title: 'Some Title Here', time: '10:30 AM' },
        { date: 15, title: 'Some Title Here', time: '9:00 AM' },
        { date: 23, title: 'Some Title Here', time: '10:30 AM' },
      ],
    }
  ];
}
