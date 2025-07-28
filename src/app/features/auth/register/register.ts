import { Component, inject } from '@angular/core';
import { FieldConfigInterface } from '../../../core/models/field-config.interface';
import { DynamicForm } from '../../../shared/components/dynamic-form/dynamic-form';
import { SignUpInterface } from '../../../core/models/sign-up.interface';
import { Router, RouterLink } from '@angular/router';
import { CustomButtonInterface } from '../../../core/models/custom-button.interface';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from '../../../core/services/auth/register';
import { ToastrService } from 'ngx-toastr';
import { registerationButtonConfig } from './register.button';
import { registerationFormJson } from './register.form';

@Component({
  selector: 'app-register',
  imports: [DynamicForm, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  http = inject(HttpClient);
  registerService = inject(RegisterService);
  toastr = inject(ToastrService);
  router = inject(Router);

  formJson: FieldConfigInterface[] = registerationFormJson;
  buttonConfig: CustomButtonInterface = registerationButtonConfig;

  submitFn = (payload: string) => this.registerService.registerUser(payload);

  onDynamicFormSubmit(formValue: SignUpInterface) {
    this.router.navigate(['/auth/login']);
  }
  
}
