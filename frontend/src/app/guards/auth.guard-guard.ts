import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Redirige al home si ya hay sesión activa (para la página de login)
export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    const user = authService.getUser();
    router.navigate(['/home', user?.id]);
    return false;
  }
  return true;
};

// Redirige al login si no hay sesión (para rutas protegidas)
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/']);
    return false;
  }
  return true;
};