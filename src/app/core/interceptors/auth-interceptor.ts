import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Loader } from '../services/global/loader';
import { RefreshToken } from '../services/auth/refresh-token';
import { catchError, finalize, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const loaderService = inject(Loader);
  const refreshTokenService = inject(RefreshToken);

  const cloneReq = req.clone({
    withCredentials: true,
  });
  debugger;
  loaderService.showLoader();
  return next(cloneReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status == 401) {
        return refreshTokenService.refreshToken().pipe(
          switchMap(() => next(cloneReq)),
          catchError(err => {
            router.navigate(['/auth/login']);
            return throwError(() => err);
          })
        );
      }
      return throwError(() => error)
    }),
    finalize(()=>loaderService.hideLoader())
  );
};
