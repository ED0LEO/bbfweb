import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  username: string;
  password: string;

  constructor(private http: HttpClient) {
    this.username = '';
    this.password = '';
  }

   login(): void {
      const credentials = { username: this.username, password: this.password };
      this.http.post('http://localhost:8080/user/user-login', credentials)
        .subscribe((response: any) => {
          // Handle successful login here
          console.log('Login successful!', response);
          // Save the authentication token or cookie in local storage or cookie storage
        }, (error) => {
          // Handle login error here
          console.error('Login failed!', error);
        });
    }
}
