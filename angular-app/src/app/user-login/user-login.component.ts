import { Component } from '@angular/core';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  username: string;
  password: string;

  constructor() {
    this.username = '';
    this.password = '';
  }

  login(): void {
    // Perform login logic here
    console.log('Login button clicked');
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  }
}
