import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageKey = 'authToken';
  isLoggedIn: boolean = false;
  username: string = '';
  userId: number | undefined;

  constructor() {
    this.initializeAuthState();
  }

 private userIdSubject = new BehaviorSubject<number | undefined>(undefined);
  userId$ = this.userIdSubject.asObservable();

  setUserId(userId: number | undefined) {
    this.userIdSubject.next(userId);
  }

 getUserId(): number | undefined {
    const token = localStorage.getItem(this.storageKey);
    if (token)
      return this.getUserIdFromToken(token);
    else
      return undefined;
  }

  private initializeAuthState(): void {
    const token = localStorage.getItem(this.storageKey);
    if (token) {
      this.isLoggedIn = true;
      // Set the username based on your implementation
      this.username = this.getUsernameFromToken(token);
      this.setUserId(this.getUserIdFromToken(token));
    }
  }

  setLoggedIn(value: boolean): void {
    this.isLoggedIn = value;
  }

  setUsername(username: string): void {
    this.username = username;
  }

  autoSetUpFromToken(): void {
    const token = localStorage.getItem(this.storageKey);
        if (token) {
          this.isLoggedIn = true;
          // Set the username based on your implementation
          this.username = this.getUsernameFromToken(token);
          this.setUserId(this.getUserIdFromToken(token));
        }
  }

  private getUsernameFromToken(token: string): string {
    // Decode the token payload
    const tokenPayload = token.split('.')[1];
    const decodedPayload = atob(tokenPayload);

    // Parse the decoded payload as JSON
    const payloadObject = JSON.parse(decodedPayload);

    // Retrieve the username from the payload
    return payloadObject.sub;
  }

  private getUserIdFromToken(token: string): number | undefined {
    try {
      // Decode the token payload
      const tokenPayload = token.split('.')[1];
      const decodedPayload = atob(tokenPayload);

      // Parse the decoded payload as JSON
      const payloadObject = JSON.parse(decodedPayload);

      // Retrieve the userId from the payload
      const userId = payloadObject.userId;

      // Check if userId exists and return it
      return userId !== undefined ? +userId : undefined;
    } catch (error) {
      console.error('Failed to extract userId from token:', error);
      return undefined;
    }
  }

  logout(): void {
    // Perform the logout action
    this.setLoggedIn(false);
    this.setUsername('');
    this.setUserId(undefined); // Set userId to undefined
    localStorage.removeItem(this.storageKey); // Remove the authentication token
  }
}
