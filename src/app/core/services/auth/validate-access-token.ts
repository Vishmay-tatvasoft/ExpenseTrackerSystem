import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidateAccessToken {
  http = inject(HttpClient);
  apiURL = `${environment.apiURI}/Auth/validate`;

  validateAccessToken(): Observable<any> {
    return this.http.get<{ isValid: boolean, isExpired: boolean | null, isRememberMe: boolean }>(this.apiURL, { withCredentials: true });
  }
}
