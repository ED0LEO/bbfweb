import { Component } from '@angular/core';
import { MatDatepickerInputEvent, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/Task';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  selectedDate: Date | null = null;
  completedTasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog
  ) {}

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
  //Highligh 1st and 20th day
    if (view === 'month') {
      cellDate = new Date(cellDate);
      const date = cellDate.getDate();
      return (date === 1 || date === 20) ? 'special-days' : '';
    }
    return '';
  }

  selectDate(): void {
    if (this.selectedDate) {
      this.selectedDate = new Date(this.selectedDate);
      const completionDate =this.formatDate(this.selectedDate);
      this.taskService.getCompletedTasksByDate(completionDate).subscribe((tasks) => {
        this.completedTasks = tasks;
      });
    }
    else {
      console.log("date not selected");
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  openTaskDetails(task: Task): void {
    this.dialog.open(TaskDetailsComponent, {
      data: task, // Pass the selected task as data to the dialog
    });
  }
}
