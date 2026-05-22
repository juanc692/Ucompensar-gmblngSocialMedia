import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Si no hay token, deja pasar la petición sin modificar
  // (ej: login y register no necesitan token)
  if (!token) {
    return next(req);
  }

  // Clona la petición agregando el header Authorization
  const reqWithToken = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });

  return next(reqWithToken);
};