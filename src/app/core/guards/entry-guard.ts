import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ValidateAccessToken } from '../services/auth/validate-access-token';
import { RefreshToken } from '../services/auth/refresh-token';
import { catchError, map, of, switchMap } from 'rxjs';

export const entryGuard: CanActivateFn = (route, state) => {
  const validateTokenService = inject(ValidateAccessToken);
  const refreshTokenService = inject(RefreshToken);
  const router = inject(Router);

  return validateTokenService.validateAccessToken().pipe(
    switchMap((res) => {
      debugger;
      const data = res.data;
      // Token is valid and not expired — redirect to dashboard
      if (data.isValid && !data.isExpired) {
        router.navigateByUrl('/dashboard');
        return of(false);
      }

      // Token expired but rememberMe = true → try refresh
      if (data.isExpired && data.isRememberMe) {
        return refreshTokenService.refreshToken().pipe(
          map(() => {
            router.navigateByUrl('/dashboard');
            return false;
          }),
          catchError(() => of(true)) // Refresh failed → stay on login
        );
      }

      // Token expired and rememberMe = false — allow login page
      return of(true);
    }),
    catchError(() => of(true)) // In case of error, allow login
  );
};
