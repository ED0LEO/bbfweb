import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Habit } from '../models/habit.model';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  private baseUrl = 'http://localhost:8080/habit'; // Adjust the URL according to your backend API

  constructor(private http: HttpClient) { }

  getHabitsByUser(userId: number): Observable<Habit[]> {
    return this.http.get<Habit[]>(`${this.baseUrl}?userId=${userId}`).pipe(
      catchError(error => {
        console.error('Error fetching habits:', error);
        return [];
      })
    );
  }

  createHabit(habit: Habit): Observable<Habit> {
    return this.http.post<Habit>(this.baseUrl, habit).pipe(
      catchError(error => {
        console.error('Error creating habit:', error);
        throw error;
      })
    );
  }

  updateHabit(habit: Habit): Observable<Habit> {
    const url = `${this.baseUrl}/${habit.id}`;
    return this.http.put<Habit>(url, habit).pipe(
      catchError(error => {
        console.error('Error updating habit:', error);
        throw error;
      })
    );
  }

  deleteHabit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting habit:', error);
        throw error;
      })
    );
  }
}
