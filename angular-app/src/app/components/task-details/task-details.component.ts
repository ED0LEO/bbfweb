import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent {
  user: User | undefined;

  constructor(
    public dialogRef: MatDialogRef<TaskDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public task: Task, // Use "task" as the input data variable
    private taskService: TaskService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData(): void {
    if (this.authService.isLoggedIn) {
      const userId = this.authService.getUserId();

      if (userId !== undefined) {
        // Fetch the user data using the UserService
        this.userService.getUserById(userId).subscribe(
          (user) => {
            this.user = user;
          },
          (error) => {
            console.error('Failed to fetch user data:', error);
          }
        );
      }
    }
  }

  changeCompletionStatus(): void {
    this.task.completion = !this.task.completion;
    if (this.task.completion) {
      this.task.completionDate = new Date().toISOString().split('T')[0]; // Set the completion date
    } else {
      this.task.completionDate = undefined; // Clear the completion date
    }

    // Update the task on the server
    this.taskService.updateTask(this.task).subscribe(() => {
      this.notificationService.showNotification(
        `Task marked as ${this.task.completion ? 'completed' : 'incomplete'}`
      );

      if (this.user) {
        if (this.task.completion) {
          this.user.points += 20;
          this.notificationService.showNotification('+20 pts');
        } else {
          this.user.points -= 20;
          this.notificationService.showNotification('-20 pts');
        }

        // Update the user data using the UserService
        this.userService.updateUser(this.user.id, this.user).subscribe(
          () => {
            console.log('User points updated successfully.');
          },
          (error) => {
            console.error('Failed to update user points:', error);
          }
        );
      }
    });
  }

  deleteTask(): void {
    this.taskService.deleteTask(this.task.id).subscribe(() => {
      this.dialogRef.close(); // Close the dialog after deleting the task
      this.notificationService.showNotification('Task deleted successfully!');
    });
  }

  closeModal(): void {
    this.dialogRef.close(); // Close the dialog without saving any changes
  }
}
