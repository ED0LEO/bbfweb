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
    // Perform login logic here
    console.log('Login button clicked');
    console.log('Username:', this.username);
    console.log('Password:', this.password);

    const credentials = { username: this.username, password: this.password };
        this.http.post('http://localhost:8080/login', credentials)
          .subscribe((response: any) => {
            // Handle successful login here
            console.log('Login successful!', response);
            // Save the authentication token or cookie in local storage or cookie storage
          }, (error) => {
            // Handle login error here
            console.error('Login failed!', error);
          });
      }

//   onSubmit(loginForm: NgForm) {
//     const username = loginForm.value.username;
//     const password = loginForm.value.password;
//
//     // Send the POST request to the backend endpoint for authentication
//     this.http.post<any>('http://localhost:8080/login', { username, password }).subscribe(
//       response => {
//         // Handle the successful authentication response here
//         // Store the authentication token or cookie in local storage or cookie storage
//       },
//       error => {
//         // Handle any error that occurred during authentication
//       }
//     );
//   }

}
