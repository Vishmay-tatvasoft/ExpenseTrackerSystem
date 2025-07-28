import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { SignUpInterface } from '../../models/sign-up.interface';
import { ApiResponseInterface } from '../../models/api-response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  http = inject(HttpClient);
  apiURL = `${environment.apiURI}/auth/register`;

  registerUser(encryptedPayload: string): Observable<ApiResponseInterface<SignUpInterface>>{
    return this.http.post<ApiResponseInterface<SignUpInterface>>(this.apiURL, JSON.stringify(encryptedPayload),{
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
