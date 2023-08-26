import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../services/activity.service'; // Import the activity service
import { Activity } from '../../models/activity.model'; // Import the activity model
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
  activities: Activity[] = []; // Array to store activities
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
      // Call the activity service to create the new activity
      this.activityService.createActivity(this.newActivity).subscribe(activity => {
        this.activities.push(activity); // Add the created activity to the array
        this.newActivity = new Activity();
      });
    }
  }

  fetchActivities(): void {
    // Fetch activities here and populate the `activities` array
    if  (this.user){
      this.activityService.getActivitiesByUser(this.user.id).subscribe(activities => {
        this.activities = activities;
      });
    }
  }
}
