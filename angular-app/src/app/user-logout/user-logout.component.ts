import { Component } from '@angular/core';
import { UserAccountService } from '../user-account.service';

@Component({
  selector: 'app-user-logout',
  template: `
    <h2>Logout</h2>
    <p>Performing logout...</p>
  `
})
export class UserLogoutComponent {
  constructor(private userAccountService: UserAccountService) {
    this.logout();
  }

  logout() {
    this.userAccountService.logout().subscribe(
      () => {
        console.log('Logged out successfully');
      },
      (error) => {
        console.log('Failed to logout', error);
      }
    );
  }
}
