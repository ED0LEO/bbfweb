import { Component, OnInit } from '@angular/core';
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
export class CalendarComponent implements OnInit {
  selectedDate: Date | null = null;
  completedTasks: Task[] = [];
  completedTasksMap: Map<string, Task[]> = new Map();

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchCompletedTasks();
  }

  async fetchCompletedTasks(): Promise<void> {
    // Get the current date to determine the month
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Initialize the map
    this.completedTasksMap = new Map<string, Task[]>();

    // Loop through each day of the current month
    for (let day = 1; day <= new Date(currentYear, currentMonth + 1, 0).getDate(); day++) {
      // Construct the formatted date for the current day
      const formattedDate = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

      // Fetch completed tasks for the current day
      const tasks = await this.taskService.getCompletedTasksByDate(formattedDate).toPromise();

      // Add tasks to the map only if the tasks array is defined
      if (tasks !== undefined) {
        this.completedTasksMap.set(formattedDate, tasks);
      }
    }
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const formattedDate = this.formatDate(new Date(cellDate));

      // Check if there are completed tasks for the current day
      const tasksForDay = this.completedTasksMap.get(formattedDate);
      const hasCompletedTasks = tasksForDay && tasksForDay.length > 0;

      return hasCompletedTasks ? 'special-days' : '';
    }
    return '';
  }

  selectDate(): void {
    if (this.selectedDate) {
      this.selectedDate = new Date(this.selectedDate);
      const completionDate = this.formatDate(this.selectedDate);
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
