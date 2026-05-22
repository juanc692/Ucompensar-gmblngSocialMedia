import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../models/user-service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  errorMsg: string = '';

  constructor(
    private router: Router,private authService: AuthService,private userService: UserService,private cdr: ChangeDetectorRef
  ) {}

  entrar(email: string, contrasenia: string) {
    if (!email || !contrasenia) {
      alert('Por favor, rellena todos los campos.');
      return;
    }

    this.authService.login(email, contrasenia).subscribe({
      next: (response) => {
        this.userService.setUser(response.user);
        this.router.navigate(['/home', response.user.id]);
      },
      error: (err) => {
        this.errorMsg = err.error?.error || 'Credenciales incorrectas. Intenta de nuevo.';
        this.cdr.detectChanges(); // fuerza la actualización del template
      }
    });
  }
}