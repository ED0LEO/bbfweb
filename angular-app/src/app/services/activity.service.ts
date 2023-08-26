import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Activity } from '../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private baseUrl = 'http://localhost:8080/activity';

  constructor(private http: HttpClient) { }

  getActivitiesByUser(userId: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.baseUrl}?userId=${userId}`).pipe(
      catchError(error => {
        console.error('Error fetching activities:', error);
        return [];
      })
    );
  }

  createActivity(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(this.baseUrl, activity).pipe(
      catchError(error => {
        console.error('Error creating activity:', error);
        throw error;
      })
    );
  }

  updateActivity(activity: Activity): Observable<Activity> {
    const url = `${this.baseUrl}/${activity.id}`;
    return this.http.put<Activity>(url, activity).pipe(
      catchError(error => {
        console.error('Error updating activity:', error);
        throw error;
      })
    );
  }

  deleteActivity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting activity:', error);
        throw error;
      })
    );
  }
}
