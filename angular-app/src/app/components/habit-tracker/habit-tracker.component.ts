import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-habit-tracker',
  templateUrl: './habit-tracker.component.html',
  styleUrls: ['./habit-tracker.component.css']
})
export class HabitTrackerComponent implements OnInit {
  habits: { name: string; days: number }[] = [];

  constructor() { }

  ngOnInit(): void {
    // Initialize habits (e.g., with some example habits)
    this.habits = [
      { name: 'Smoking', days: 10 },
      { name: 'Sugary snacks', days: 5 },
      { name: 'Social media', days: 2 }
    ];
  }

  incrementDays(habit: { name: string; days: number }): void {
    habit.days++;
  }
}
