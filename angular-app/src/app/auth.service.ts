import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageKey = 'authToken';
  isLoggedIn: boolean = false;
  username: string = '';

  constructor() {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    const token = localStorage.getItem(this.storageKey);
    if (token) {
      this.isLoggedIn = true;
      // Set the username based on your implementation
      this.username = this.getUsernameFromToken(token);
    }
  }

  setLoggedIn(value: boolean): void {
    this.isLoggedIn = value;
  }

  setUsername(username: string): void {
    this.username = username;
  }

  private getUsernameFromToken(token: string): string {
    // Extract the username from the authentication token
    // Replace this logic with your actual implementation
    return this.username;
  }

  logout(): void {
      // Perform the logout action
      this.setLoggedIn(false);
      this.setUsername('');
      localStorage.removeItem(this.storageKey); // Remove the authentication token
    }
}
