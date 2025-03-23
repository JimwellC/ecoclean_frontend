import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  credentials = { username: '', password: '' };
  error = '';
loginError: any;

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post(`${environment.apiUrl}/admin/login`, this.credentials).subscribe({
      next: () => this.router.navigate(['/admin']),
      error: () => this.error = 'Invalid username or password'
    });
  }
}
