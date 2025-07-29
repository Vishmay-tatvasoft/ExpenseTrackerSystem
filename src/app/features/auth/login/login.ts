import { Component, inject, ViewChild } from '@angular/core';
import { LoginInterface } from '../../../core/models/login.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../../core/services/auth/login';
import { Router, RouterLink } from '@angular/router';
import { DynamicForm } from '../../../shared/components/dynamic-form/dynamic-form';
import { FieldConfigInterface } from '../../../core/models/field-config.interface';
import { loginFormJson } from './login.form';
import { Snackbar } from '../../../shared/services/snackbar';
import { CanComponentDeactivateInterface } from '../../../core/models/can-component-deactivate.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [DynamicForm, ReactiveFormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginService = inject(LoginService);
  router = inject(Router);
  snackbar = inject(Snackbar);

  formJson: FieldConfigInterface[] = loginFormJson;

  submitFn = (payload: string) => this.loginService.login(payload);

  onDynamicFormSubmit(loginCredentials: LoginInterface) {
    this.router.navigate(['/dashboard']);
  }

}