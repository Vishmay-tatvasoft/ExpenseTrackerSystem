import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponseInterface } from '../../models/api-response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  http = inject(HttpClient);
  apiURL = `${environment.apiURI}/Auth/forgotpassword`;

  forgotpassword(encryptedPayload: string): Observable<ApiResponseInterface<string>>{
    return this.http.post<ApiResponseInterface<string>>(this.apiURL, JSON.stringify(encryptedPayload),{
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
