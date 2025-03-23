import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [ContactService] // ✅ Add this to allow DI in standalone component
})
export class ContactComponent implements OnInit {
  volunteerData: any = { interest: '' };
  reportData: any = {};
  volunteerPhoto: File | undefined;
  reportPhoto: File | undefined;


  eventTitles: string[] = [];

  constructor(
    private http: HttpClient,
    private contactService: ContactService // ✅ This now works correctly
  ) {}

  ngOnInit(): void {
    this.http.get<any[]>(`${environment.apiUrl}/events`).subscribe(events => {
      this.eventTitles = events.map(event => event.item?.title).filter(Boolean);
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.size > 4 * 1024 * 1024) {
      alert('❌ File is too large! Maximum size is 4MB.');
      this.volunteerPhoto = undefined;
      this.volunteerFileInput.nativeElement.value = ''; // Clear input
      return;
    }
    this.volunteerPhoto = file;
  }

  onReportFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.size > 4 * 1024 * 1024) {
      alert('❌ Report image is too large! Max is 4MB.');
      this.reportPhoto = undefined;
      this.reportFileInput.nativeElement.value = '';
      return;
    }
    this.reportPhoto = file;
  }


  onSubmitVolunteer() {
    if (!this.volunteerPhoto) {
      alert('Please upload a volunteer photo.');
      return;
    }

    this.contactService.submitVolunteerForm(this.volunteerData, this.volunteerPhoto).subscribe({
      next: () => {
        alert('✅ Volunteer form submitted!');
        this.volunteerData = { interest: '' };
        this.volunteerPhoto = undefined;
        this.volunteerFileInput.nativeElement.value = '';
      },
      error: () => alert('❌ Error submitting volunteer form.')
    });
  }

  onSubmitReport() {
    if (!this.reportPhoto) {
      alert('Please upload a report photo.');
      return;
    }

    this.contactService.submitReportForm(this.reportData, this.reportPhoto).subscribe({
      next: () => {
        alert('✅ Report submitted!');
        this.reportData = {};
        this.reportPhoto = undefined;
        this.reportFileInput.nativeElement.value = '';
      },
      error: () => alert('❌ Error submitting report.')
    });
  }

  @ViewChild('volunteerSection') volunteerSection!: ElementRef;
  @ViewChild('reportSection') reportSection!: ElementRef;

  @ViewChild('volunteerFileInput') volunteerFileInput!: ElementRef;
  @ViewChild('reportFileInput') reportFileInput!: ElementRef;


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
