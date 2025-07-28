import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { ApiResponseInterface } from '../../models/api-response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtpVerificationService {
  http = inject(HttpClient);
  apiURL = `${environment.apiURI}/Auth/verifyOTP`;

  verifyOTP(encryptedPayload: string): Observable<ApiResponseInterface<string>>{
    return this.http.post<ApiResponseInterface<string>>(this.apiURL, JSON.stringify(encryptedPayload),{
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
