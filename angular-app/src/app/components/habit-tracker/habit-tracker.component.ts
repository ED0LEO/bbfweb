import { Component, OnInit } from '@angular/core';
import { HabitService } from '../../services/habit.service'; // Import your habit service
import { Habit } from '../../models/habit.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
// import { HabitDetailsComponent } from '../habit-details/habit-details.component'; // Import your habit details component

@Component({
  selector: 'app-habit-tracker',
  templateUrl: './habit-tracker.component.html',
  styleUrls: ['./habit-tracker.component.css']
})
export class HabitTrackerComponent implements OnInit {
  habits: Habit[] = [];
  newHabit: Habit = new Habit();
  user: User | undefined;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private habitService: HabitService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchUserData();

    if (this.user) {
      this.fetchUserHabits();
    }
  }

  fetchUserData(): void {
    if (this.authService.isLoggedIn) {
      const userId = this.authService.getUserId();

      if (userId !== undefined) {
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

  fetchUserHabits(): void {
    if (this.user) {
      this.habitService.getHabitsByUser(this.user.id).subscribe(habits => {
        this.habits = habits;
      });
    }
  }

  openHabitDetails(habit: Habit): void {
//     const dialogRef = this.dialog.open(HabitDetailsComponent, {
//       data: habit
//     });
//
//     dialogRef.afterClosed().subscribe(result => {
//       if (result === 'updated') {
//         // Habit was updated, fetch user habits again
//         this.fetchUserHabits();
//       }
//     });
  }

  addHabit(): void {
    if (this.user) {
      this.newHabit.user = this.user;
      this.habitService.createHabit(this.newHabit).subscribe(habit => {
        this.habits.push(habit);
        this.newHabit = new Habit();

//         this.notificationService.showNotification('Habit created successfully!');
      });
    }
  }

  deleteHabit(habit: Habit): void {
    if (habit.id && this.user) {
      this.habitService.deleteHabit(habit.id).subscribe(() => {
        // Habit was deleted, fetch user habits again
        this.fetchUserHabits();
      });
    }
  }
}
