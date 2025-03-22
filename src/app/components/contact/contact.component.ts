import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ContactComponent {
  volunteerData: any = {};
  reportData: any = {};
  volunteerPhoto!: File;
  reportPhoto!: File;

  constructor(private contactService: ContactService) {}

  onFileSelected(event: any) {
    this.volunteerPhoto = event.target.files[0];
  }

  onReportFileSelected(event: any) {
    this.reportPhoto = event.target.files[0];
  }

  onSubmitVolunteer() {
    this.contactService.submitVolunteerForm(this.volunteerData, this.volunteerPhoto).subscribe({
      next: () => alert('✅ Volunteer form submitted!'),
      error: () => alert('❌ Error submitting volunteer form.')
    });
  }

  onSubmitReport() {
    this.contactService.submitReportForm(this.reportData, this.reportPhoto).subscribe({
      next: () => alert('✅ Report submitted!'),
      error: () => alert('❌ Error submitting report.')
    });
  }
}
