import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../models/user-service';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UserHttpService {

  private apiUrl = 'http://localhost:3000/api/users';

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private authService: AuthService
  ) {}

  addPoints(points: number): Observable<{ points: number }> {
    return this.http.patch<{ points: number }>(`${this.apiUrl}/add-points`, { points });
  }

  awardPoints(points: number): void {
    this.addPoints(points).subscribe({
      next: (res) => {
        // Actualiza el usuario con el total real que devuelve el servidor
        const user = this.userService.getCurrentUser();
        if (user) {
          const updatedUser = { ...user, points: res.points };
          // Actualiza el estado en memoria
          this.userService.setUser(updatedUser);
          // Actualiza localStorage para que persista al navegar y recargar
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      },
      error: (err) => console.error('Error al guardar puntos:', err)
    });
  }
}