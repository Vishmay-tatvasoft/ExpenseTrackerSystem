import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { TokenResponseInterface } from '../../models/token-response.interface';

@Injectable({
  providedIn: 'root'
})
export class RefreshToken {
  http = inject(HttpClient);
  apiURL = `${environment.apiURI}/Auth/refresh`;

  refreshToken(): Observable<TokenResponseInterface> {
    return this.http.get<TokenResponseInterface>(this.apiURL, {withCredentials: true});
  }
}
