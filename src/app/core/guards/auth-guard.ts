import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ValidateAccessToken } from '../services/auth/validate-access-token';
import { catchError, map, of, switchMap } from 'rxjs';
import { RefreshToken } from '../services/auth/refresh-token';

export const authGuard: CanActivateFn = (route, state) => {
  const validateTokenService = inject(ValidateAccessToken);
  const refreshTokenService = inject(RefreshToken);
  const router = inject(Router);

  return validateTokenService.validateAccessToken().pipe(
    switchMap(res => {
      debugger;
      const data = res.data;
      if(data.isValid){
        return of(true);
      }
      if(data.isExpired){
        return refreshTokenService.refreshToken().pipe(
          map(() => true),
          catchError(() => {
            router.navigateByUrl('/auth/login');
            return of(false);
          })
        );
      }

      router.navigateByUrl('/auth/login');
      return of(true);
    }),
    catchError(() => {
      router.navigateByUrl('/auth/login');
      return of(false);
    })
  )
};
