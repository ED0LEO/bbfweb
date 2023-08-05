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

  selectDate(event: MatDatepickerInputEvent<Date>): void {
    if (event) {
      const stringified = JSON.stringify(event);
      const dateString = stringified.substring(1, 11);
      this.selectedDate = new Date(dateString);
      if (this.selectedDate) {
        const completionDate =this.formatDate(this.selectedDate);
        this.taskService.getCompletedTasksByDate(completionDate).subscribe((tasks) => {
          this.completedTasks = tasks;
        });
      }
      else {
        console.log("date not selected");
      }
    }
    else {
      console.log("event not found");
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
