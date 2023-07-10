import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: boolean = false; // Renamed property

  constructor() {}

  login(): void {
    // Perform the login action
    // Set the loggedIn flag accordingly
    this.loggedIn = true;
  }

  logout(): void {
    // Perform the logout action
    // Clear the loggedIn flag
    this.loggedIn = false;
  }

  getIsLoggedIn(): boolean {
    return this.loggedIn; // Updated property name
  }

  getUsername(): string {
    return 'John Doe'; // Replace with actual username or fetch from server
  }
}
