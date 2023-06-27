import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { UserAccountService } from './user-account.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  user: User;
  newPassword: string;

  constructor(private userAccountService: UserAccountService) { }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userAccountService.getUserProfile().subscribe(
      (user: User) => {
        this.user = user;
      },
      (error) => {
        console.log('Failed to load user profile', error);
      }
    );
  }

  updatePassword() {
    this.userAccountService.updateUserProfile(this.user).subscribe(
      (updatedUser: User) => {
        console.log('User profile updated successfully', updatedUser);
      },
      (error) => {
        console.log('Failed to update user profile', error);
      }
    );
  }
}
