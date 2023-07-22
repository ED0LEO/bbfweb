import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

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

  constructor(private authService: AuthService, private userService: UserService, private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
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
      });
    }
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
    });
  }

  updateTask(task: Task): void {
    this.taskService.updateTask(task).subscribe();

    if (this.user)
    {
      if (task.completion) {
        this.user.points += 20;
      }
      else
      {
        this.user.points -= 20;
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
