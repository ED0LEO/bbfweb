import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { UserAccountService } from './user-account.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User;

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
}
