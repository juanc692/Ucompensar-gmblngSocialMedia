import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  const reqWithToken = token
    ? req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) })
    : req;

  return next(reqWithToken).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si el token expiró o es inválido, limpiar sesión y redirigir al login
      if (error.status === 401 || (error.status === 400 && error.error?.message === 'Token no valido')) {
        authService.logout();
        router.navigate(['/']);
      }
      return throwError(() => error);
    })
  );
};