import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../services/auth.service';

export interface UserData {
  id: number;
  email: string;
  name: string;
  points?: number;
}

@Injectable({ providedIn: 'root' })
export class UserService {

  // Compatibilidad con código existente
  private userNameSource = new BehaviorSubject<string>('Invitado');
  userName = this.userNameSource.asObservable();

  setUserName(name: string) {
    this.userNameSource.next(name);
  }

  // Estado completo del usuario
  private userSource = new BehaviorSubject<UserData | null>(null);
  user$ = this.userSource.asObservable();

  // Puntos como observable independiente para la navbar
  private pointsSource = new BehaviorSubject<number>(0);
  points$ = this.pointsSource.asObservable();

  constructor(private authService: AuthService) {
    const savedUser = this.authService.getUser();
    if (savedUser) {
      this.userSource.next(savedUser);
      this.userNameSource.next(savedUser.name);
      this.pointsSource.next(savedUser.points ?? 0);
    }
  }

  setUser(user: UserData): void {
    this.userSource.next(user);
    this.userNameSource.next(user.name);
    this.pointsSource.next(user.points ?? 0);
  }

  getCurrentUser(): UserData | null {
    return this.userSource.getValue();
  }

  // Suma puntos localmente sin necesidad de recargar del backend
  addPoints(points: number): void {
    const current = this.pointsSource.getValue();
    this.pointsSource.next(current + points);
  }

  clearUser(): void {
    this.userSource.next(null);
    this.userNameSource.next('Invitado');
    this.pointsSource.next(0);
    this.authService.logout();
  }
}