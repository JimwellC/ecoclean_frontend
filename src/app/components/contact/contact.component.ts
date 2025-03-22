import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  volunteerData = {
    name: '',
    interest: '',
    message: '',
    photo: null as File | null
  };

  reportData = {
    type: '',
    name: '',
    email: '',
    description: '',
    image: null as File | null
  };

  onFileSelected(event: any) {
    this.volunteerData.photo = event.target.files[0];
  }

  onReportFileSelected(event: any) {
    this.reportData.image = event.target.files[0];
  }

  onSubmitVolunteer() {
    alert('Volunteer form submitted (UI only)');
  }

  onSubmitReport() {
    alert('Report form submitted (UI only)');
  }
}
