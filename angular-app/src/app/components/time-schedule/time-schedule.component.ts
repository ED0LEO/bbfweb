import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-schedule',
  templateUrl: './time-schedule.component.html',
  styleUrls: ['./time-schedule.component.css']
})
export class TimeScheduleComponent implements OnInit {
  // Define variables for time schedule
  timeSlots: string[] = [];
  selectedTime: string = '';

  constructor() { }

  ngOnInit(): void {
    // Initialize time slots for today's day (e.g., from 9 AM to 5 PM)
    for (let hour = 9; hour <= 17; hour++) {
      this.timeSlots.push(`${hour}:00`);
    }
  }

  // Function to handle time selection
  selectTime(time: string): void {
    this.selectedTime = time;
  }

  // Function to save the selected time slot
  saveTimeSlot(): void {
    // Implement your logic to save the selected time slot
    console.log(`Selected time slot: ${this.selectedTime}`);
  }
}
