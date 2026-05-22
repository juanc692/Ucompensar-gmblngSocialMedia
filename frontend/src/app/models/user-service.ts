import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../services/auth.service';

export interface UserData {
  id: number;
  email: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {


  private userNameSource = new BehaviorSubject<string>('Invitado');
  userName = this.userNameSource.asObservable();

  setUserName(name: string) {
    this.userNameSource.next(name);
  }


  // Estado completo del usuario logueado
  private userSource = new BehaviorSubject<UserData | null>(null);
  user$ = this.userSource.asObservable();

  constructor(private authService: AuthService) {
    // Al iniciar la app, restaura el usuario desde localStorage si ya había sesión
    const savedUser = this.authService.getUser();
    if (savedUser) {
      this.userSource.next(savedUser);
      this.userNameSource.next(savedUser.name);
    }
  }

  // Llama esto tras un login exitoso para poblar todo el estado
  setUser(user: UserData): void {
    this.userSource.next(user);
    this.userNameSource.next(user.name); // mantiene sincronizado el observable existente
  }

  // Obtiene el usuario actual de forma síncrona (útil en guards o servicios)
  getCurrentUser(): UserData | null {
    return this.userSource.getValue();
  }

  // Limpia el estado al cerrar sesión
  clearUser(): void {
    this.userSource.next(null);
    this.userNameSource.next('Invitado');
    this.authService.logout();
  }
}