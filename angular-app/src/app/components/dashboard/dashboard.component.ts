import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: User | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to the user$ observable to get user data
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    // Fetch the user data
    this.authService.autoSetUpFromToken();
  }
}
