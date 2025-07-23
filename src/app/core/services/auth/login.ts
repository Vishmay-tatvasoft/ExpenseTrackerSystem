import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { LoginInterface } from '../../models/login.interface';
import { Observable } from 'rxjs';
import { ApiResponseInterface } from '../../models/api-response.interface';
import { UserInterface } from '../../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  http = inject(HttpClient);
  apiURL = `${environment.apiURI}/auth/Login`;

  login(credentials: LoginInterface): Observable<ApiResponseInterface<UserInterface>>{
    return this.http.post<ApiResponseInterface<UserInterface>>(this.apiURL, credentials);
  }
}
