import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { Activity } from '../../models/activity.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-time-schedule',
  templateUrl: './time-schedule.component.html',
  styleUrls: ['./time-schedule.component.css']
})
export class TimeScheduleComponent implements OnInit {
  timeSlots: string[] = [];
  newActivity: Activity = new Activity();
  activities: Activity[] = [];
  user: User | undefined;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData(): void {
    if (this.authService.isLoggedIn) {
      const userId = this.authService.getUserId();

      if (userId !== undefined) {
        this.userService.getUserById(userId).subscribe(
          (user) => {
            this.user = user;
            for (let hour = 9; hour <= 17; hour++) {
              this.timeSlots.push(`${hour}:00`);
            }
            this.fetchActivities();
          },
          (error) => {
            console.error('Failed to fetch user data:', error);
          }
        );
      }
    }
  }

  saveTimeSlot(): void {
    console.log("this start: " + this.newActivity.startTime + "; this end: " + this.newActivity.endTime);
    if (this.user) {
      this.newActivity.user = this.user;
      this.activityService.createActivity(this.newActivity).subscribe(activity => {
        this.activities.push(activity);
        this.newActivity = new Activity();
        this.activities.sort((a, b) => {
          // Compare activities based on their start times for sorting
          return (a.startTime || '').localeCompare(b.startTime || ''); // Use an empty string as a fallback value
        });
      });
    }
  }

  fetchActivities(): void {
    if (this.user) {
      this.activityService.getActivitiesByUser(this.user.id).subscribe(activities => {
        this.activities = activities;
        // Sort activities by start time when fetched
        this.activities.sort((a, b) => {
          return (a.startTime || '').localeCompare(b.startTime || ''); // Use empty strings as fallback values
        });
     });
    }
  }
}
