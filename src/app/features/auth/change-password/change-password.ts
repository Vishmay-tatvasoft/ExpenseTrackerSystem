import { Component, inject } from '@angular/core';
import { FieldConfigInterface } from '../../../core/models/field-config.interface';
import { DynamicForm } from '../../../shared/components/dynamic-form/dynamic-form';
import { ChangePasswordFormJson } from './change-password.form';
import { ChangePasswordService } from '../../../core/services/auth/change-password';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  imports: [DynamicForm],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss'
})
export class ChangePassword {
  formJson:FieldConfigInterface[] = ChangePasswordFormJson;
  changePasswordService = inject(ChangePasswordService);
  router = inject(Router);

  additionalFormData = {
    emailAddress: this.router.getCurrentNavigation()?.extras?.state?.['email'] ?? localStorage.getItem('resetEmail') ?? ''
  };
  submitFn = (payload: string) => this.changePasswordService.changePassword(payload);

  onDynamicFormSubmit(){
    this.router.navigate(['/auth/login']);
  }
}