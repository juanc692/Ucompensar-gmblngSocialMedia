import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Activity {
  id: number;
  name_activity: string;
  description: string;
  cost_points: number;
  create_at: string;
  creator_id: number;
  creator_name?: string;
}

export interface CreateActivityPayload {
  name_activity: string;
  description: string;
  cost_points?: number;
}

@Injectable({ providedIn: 'root' })
export class ActivityService {

  private apiUrl = 'http://localhost:3000/api/activities';

  constructor(private http: HttpClient) {}

  getActivities(page = 1, limit = 10): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiUrl}/allActivities`, {
      params: { page, limit }
    });
  }

  searchActivity(name: string): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiUrl}/searchActivity`, {
      params: { name_activity: name }
    });
  }

  // Requiere JWT — el interceptor lo adjunta automáticamente
  createActivity(payload: CreateActivityPayload): Observable<Activity> {
    return this.http.post<Activity>(`${this.apiUrl}/createActivity`, payload);
  }

  joinActivity(activityId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/joinActivity`, { activity_id: activityId });
  }

  deleteActivity(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteActivity/${id}`);
  }
}