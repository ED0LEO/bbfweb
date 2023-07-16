import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-logout',
  template: `
    <h2>Logout</h2>
    <p>Performing logout...</p>
  `
})
export class UserLogoutComponent {
  constructor(
   private router: Router) {
    this.router.navigate(['/user/user-login']);
  }
}
