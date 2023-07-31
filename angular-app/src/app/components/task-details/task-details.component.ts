import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<TaskDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public task: Task, // Use "task" as the input data variable
    private taskService: TaskService,
    private notificationService: NotificationService
  ) {}

  changeCompletionStatus(): void {
    this.task.completion = !this.task.completion;
    this.taskService.updateTask(this.task).subscribe(() => {
      this.notificationService.showNotification(
        `Task marked as ${this.task.completion ? 'completed' : 'incomplete'}`
      );
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
