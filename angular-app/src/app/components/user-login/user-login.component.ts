import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  username: string;
  password: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.username = '';
    this.password = '';
  }

  login(): void {
    const credentials = { username: this.username, password: this.password };
    this.http.post('http://localhost:8080/user/user-login', credentials)
      .subscribe((response: any) => {
        // Handle successful login here
        console.log('Login successful!', response);
        // Save the authentication token in local storage
        localStorage.setItem('authToken', response.token);
        // Update the authentication state in the service
        this.authService.autoSetUpFromToken();

        this.showNotification("Login successful!");

        // Redirect to the success page
        this.router.navigate(['/users']);
      }, (error) => {
        // Handle login error here
        console.error('Login failed!', error);

        this.showNotification("Login failed!");
      });
  }

  showNotification(message: string, action: string = 'Close') {
    this.snackBar.open(message, undefined, {
      duration: 3000, // Duration in milliseconds (3 seconds in this example)
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['custom-snackbar'],
    });
  }
}
