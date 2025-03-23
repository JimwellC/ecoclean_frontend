import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ContactComponent {
  volunteerData: any = { interest: '' };
  reportData: any = {};
  volunteerPhoto!: File;
  reportPhoto!: File;

  eventTitles: string[] = [];
  contactService: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/api/events').subscribe(events => {
      // Flatten and collect all event titles
      this.eventTitles = events.map(event => event.item?.title).filter(Boolean);
    });
  }

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

  @ViewChild('volunteerSection') volunteerSection!: ElementRef;
  @ViewChild('reportSection') reportSection!: ElementRef;

  scrollToVolunteer() {
    const yOffset = -150;
    const y = this.volunteerSection.nativeElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }


  scrollToReport() {
    const yOffset = -150;
    const y = this.reportSection.nativeElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}
