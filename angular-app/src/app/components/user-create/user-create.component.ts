import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  user: User = new User();
  sourceVideos: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
  }

  saveUser() {
    // Set the sourceVideos field of the user before saving
    this.user.sourceVideos = this.sourceVideos.split(',');

    this.userService.createUser(this.user).subscribe({
      next: (data) => {
        console.log(data);
        this.notificationService.showNotification("User created");
        this.redirectToUserList();
      },
      error: (e) => {
        this.notificationService.showNotification("Problem has occurred");
        console.log(e);
      }
    });
  }

  redirectToUserList() {
    this.router.navigate(['/users']);
  }

  onSubmit() {
    console.log(this.user);
    this.saveUser();
  }
}
