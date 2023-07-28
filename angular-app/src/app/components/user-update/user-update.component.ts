import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  id!: number;
  user: User = new User();
  sourceVideos: string = ''; // Add a new field for source videos

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  private getUserById() {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe({
      next: (data) => {
        this.user = data;
        // Set the sourceVideos field when retrieving user data
        this.sourceVideos = this.user.sourceVideos.join(',');
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  ngOnInit(): void {
    this.getUserById();
  }

  updateUser() {
    // Set the sourceVideos field of the user before updating
    this.user.sourceVideos = this.sourceVideos.split(',');

    this.userService.updateUser(this.id, this.user).subscribe({
      next: (data) => {
        console.log(data);
        this.notificationService.showNotification("User update successful");
        this.redirectToUserList();
      },
      error: (e) => {
        console.log(e);
        this.notificationService.showNotification("User update failed");
      }
    });
  }

  redirectToUserList() {
    this.router.navigate(['/users']);
  }

  onSubmit() {
    console.log(this.user);
    this.updateUser();
  }
}
