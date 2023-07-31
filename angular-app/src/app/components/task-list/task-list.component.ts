import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { NotificationService } from '../../services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = new Task();
  hideCompleted: boolean = false;
  user: User | undefined;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private taskService: TaskService,
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getTasks();
    this.fetchUserData();
  }

  openTaskDetails(task: Task): void {
    this.dialog.open(TaskDetailsComponent, {
      data: task, // Pass the selected task as data to the dialog
    });
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

  getTasks(): void {
    this.taskService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  addTask(): void {
    if (this.newTask.title.trim() && this.newTask.description.trim()) {
      this.taskService.createTask(this.newTask).subscribe(task => {
        this.tasks.push(task);
        this.newTask = new Task();

        this.notificationService.showNotification('Task created successfully!');
      });
    }
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id);

      this.notificationService.showNotification('Task deleted successfully!');
    });
  }

  updateTask(task: Task): void {
    this.taskService.updateTask(task).subscribe();

    if (this.user)
    {
      if (task.completion) {
        this.user.points += 20;
        this.notificationService.showNotification('+20 pts');
      }
      else
      {
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
  }

  get filteredTasks(): Task[] {
    if (this.hideCompleted) {
      return this.tasks.filter(task => !task.completion);
    } else {
      return this.tasks;
    }
  }
}
