import { Component, inject, Input } from '@angular/core';
import { LoginInterface } from '../../../core/models/login.interface';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../core/services/auth/login';
import { Router, RouterLink } from '@angular/router';
import { DynamicForm } from '../../../shared/components/dynamic-form/dynamic-form';
import { FieldConfigInterface } from '../../../core/models/field-config.interface';
import { environment } from '../../../environment/environment';
import { encryptedPayload } from '../../../shared/utils/encryptedPayload.utility';
import { Loader } from '../../../core/services/global/loader';
import { loginFormJson } from './login.form';

@Component({
  selector: 'app-login',
  imports: [DynamicForm, ReactiveFormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginService = inject(LoginService);
  router = inject(Router);

  formJson: FieldConfigInterface[] = loginFormJson;

  submitFn = (payload: string) => this.loginService.login(payload);

  onDynamicFormSubmit(loginCredentials: LoginInterface) {
    this.router.navigate(['/dashboard']);
  }

}