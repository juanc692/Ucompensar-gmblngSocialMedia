import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Thread {
  id: number;
  category: string;
  title: string;
  body: string;
  created_at: string;
  author_id: number;
  author_name?: string;
  last_comment?: Comment | null;
}

export interface Comment {
  id: number;
  body: string;
  created_at: string;
  author_id: number;
  author_name?: string;
  thread_id: number;
  parent_id: number | null;
  replies?: Comment[];
}

export interface CreateThreadPayload {
  category: string;
  title: string;
  body: string;
}

@Injectable({ providedIn: 'root' })
export class ForumService {

  private apiUrl = 'http://localhost:3000/api/forum';

  constructor(private http: HttpClient) {}

  getThreads(page = 1, limit = 10): Observable<Thread[]> {
    return this.http.get<Thread[]>(`${this.apiUrl}/threads`, {
      params: { page, limit }
    });
  }

  getThreadById(id: number): Observable<Thread> {
    return this.http.get<Thread>(`${this.apiUrl}/threads/${id}`);
  }

  searchThreads(title: string, page = 1, limit = 10): Observable<Thread[]> {
    return this.http.get<Thread[]>(`${this.apiUrl}/threads/search`, {
      params: { title, page, limit }
    });
  }

  getThreadsByCategory(category: string, page = 1, limit = 10): Observable<Thread[]> {
    return this.http.get<Thread[]>(`${this.apiUrl}/threads/category`, {
      params: { category, page, limit }
    });
  }

  // Requiere JWT — el interceptor lo adjunta automáticamente
  createThread(payload: CreateThreadPayload): Observable<Thread> {
    return this.http.post<Thread>(`${this.apiUrl}/threads`, payload);
  }

  deleteThread(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/threads/${id}`);
  }

  createComment(threadId: number, body: string, parentId?: number): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/threads/${threadId}/comments`, {
      body,
      parent_id: parentId ?? null
    });
  }

  deleteComment(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/comments/${id}`);
  }
}