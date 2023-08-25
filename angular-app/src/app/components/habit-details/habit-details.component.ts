import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Habit } from '../../models/habit.model';
import { HabitService } from '../../services/habit.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-habit-details',
  templateUrl: './habit-details.component.html',
  styleUrls: ['./habit-details.component.css']
})
export class HabitDetailsComponent {
  editedHabit: Habit = { ...this.data }; // Create a copy of the habit data for editing

  constructor(
    public dialogRef: MatDialogRef<HabitDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Habit,
    private habitService: HabitService,
    private notificationService: NotificationService
  ) {}

  updateHabit(): void {
    this.habitService.updateHabit(this.editedHabit).subscribe(
      () => {
        this.notificationService.showNotification('Habit updated successfully!');
        this.dialogRef.close('updated'); // Notify parent component that habit was updated
      },
      (error) => {
        console.error('Error updating habit:', error);
      }
    );
  }

  cancel(): void {
    this.dialogRef.close(); // Close the dialog without saving changes
  }
}
