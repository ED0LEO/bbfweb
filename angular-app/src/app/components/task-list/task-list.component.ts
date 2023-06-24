import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = new Task();
  hideCompleted: boolean = false;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
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
  }

  get filteredTasks(): Task[] {
    if (this.hideCompleted) {
      return this.tasks.filter(task => !task.completion);
    } else {
      return this.tasks;
    }
  }
}
