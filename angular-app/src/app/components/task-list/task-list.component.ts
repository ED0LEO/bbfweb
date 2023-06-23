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

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  addTask(): void {
    if (this.newTask.title && this.newTask.description) {
      this.taskService.createTask(this.newTask).subscribe(task => {
        this.tasks.push(task);
        this.newTask = new Task(); // Clear the input fields
      });
    }
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
    });
  }

  updateTask(task: Task): void {
      this.taskService.updateTask(task).subscribe(updatedTask => {
        // Find the index of the updated task in the tasks array
        const index = this.tasks.findIndex(t => t.id === updatedTask.id);
        if (index !== -1) {
          // Replace the task at the found index with the updated task
          this.tasks[index] = updatedTask;
        }
      });
    }
}
