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
        { date: 15, title: 'Basura Mo, Sagot Mo', desc: 'Encourages residents to take responsibility for their waste by practicing proper segregation, recycling, and disposal to keep the barangay clean.', time: '10:30 AM' },
        { date: 22, title: 'Bayanihan sa Kalinisan', desc: 'A monthly community clean-up drive where residents work together to clean streets, canals, and public spaces, fostering teamwork and cleanliness.', time: '9:00 AM' },
        { date: 31, title: 'Plastik Palit-Gamit', desc: 'A program where collected plastic waste can be exchanged for school supplies, food items, or eco-friendly products to reduce plastic pollution.', time: '10:30 AM' },
      ],
    },
    {
      month: 'April 2025',
      items: [
        { date: 8, title: 'Gulayan sa Barangay', desc: 'Promotes urban gardening and backyard farming to provide fresh vegetables, improve nutrition, and enhance green spaces in the barangay.', time: '10:30 AM' },
        { date: 18, title: 'Iwas Dengue, Linis Paligid', desc: 'A campaign focused on eliminating mosquito-breeding areas by cleaning stagnant water, properly disposing of waste, and maintaining drainage systems.', time: '9:00 AM' },
        { date: 28, title: 'Eco-Brick Project', desc: 'Encourages residents to stuff plastic waste into empty bottles to create eco-bricks, which can be used for community projects like benches or plant boxes.', time: '10:30 AM' },
      ],
    },
    {
      month: 'May 2025',
      items: [
        { date: 5, title: 'No to Open Burning', desc: 'Educates the community about the harmful effects of burning trash and promotes alternative waste management solutions such as composting and recycling.', time: '10:30 AM' },
        { date: 15, title: 'Reusable Barangay', desc: 'Advocates for the use of reusable bags, containers, and utensils instead of single-use plastics to reduce waste generation.', time: '9:00 AM' },
        { date: 23, title: 'Kalusugan Una', desc: 'Promotes a holistic approach to health by organizing fitness activities, proper waste disposal awareness, and health check-ups for a cleaner and healthier barangay.', time: '10:30 AM' },
      ],
    }
  ];
}
