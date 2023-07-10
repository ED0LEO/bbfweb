import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoggedIn: boolean = false;
  username: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.getIsLoggedIn();
    this.username = this.authService.getUsername();
  }

  login() {
    // Perform the login action
    this.authService.login();
    this.isLoggedIn = this.authService.getIsLoggedIn();
    this.username = this.authService.getUsername();
  }

  logout() {
    // Perform the logout action
    this.authService.logout();
    this.isLoggedIn = this.authService.getIsLoggedIn();
    this.username = this.authService.getUsername();
  }
}
