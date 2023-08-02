import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  selectedDate: Date | null = null;
  completedTasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  // Handle date selection
//   selectDate(event: MatDatepickerInputEvent<Date>): void {
//     this.selectedDate = event.value;
//     if (this.selectedDate) {
//       const completionDate = this.selectedDate.toISOString().split('T')[0];
//       this.taskService.getCompletedTasksByDate(completionDate).subscribe((tasks) => {
//         this.completedTasks = tasks;
//       });
//     }
//   }

selectDate(event: MatDatepickerInputEvent<Date>): void {
  this.selectedDate = event.value;
  console.log('Selected date:', this.selectedDate);
  // You can perform additional actions here based on the selected date
}

}
