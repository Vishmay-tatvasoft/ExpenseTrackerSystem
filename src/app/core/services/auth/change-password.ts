import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { ApiResponseInterface } from '../../models/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  http = inject(HttpClient);
  apiURL = `${environment.apiURI}/Auth/changePassword`;

  changePassword(encryptedPayload: string): Observable<ApiResponseInterface<string>>{
    return this.http.post<ApiResponseInterface<string>>(`${this.apiURL}`,JSON.stringify(encryptedPayload),{
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
