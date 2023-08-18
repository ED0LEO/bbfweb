import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
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
    this.fetchUserData();
//     this.getTasks();
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
            this.getTasks();
          },
          (error) => {
            console.error('Failed to fetch user data:', error);
          }
        );
      }
    }
  }

  getTasks(): void {
    if (this.user) {
      console.log("user id is " + this.user.id);
      this.taskService.getTasksByUser(this.user.id).subscribe(tasks => {
        this.tasks = tasks;
      });
    }
    else
      console.log("user is not available");
  }

  addTask(): void {
    if (this.newTask.title.trim() && this.newTask.description.trim()) {
      this.newTask.user = this.user; // Associate the task with the current user
      this.taskService.createTask(this.newTask).subscribe(task => {
        this.tasks.push(task);
        this.newTask = new Task();

        this.notificationService.showNotification('Task created successfully!');
      });
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
