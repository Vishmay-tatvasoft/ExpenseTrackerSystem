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

@Component({
  selector: 'app-login',
  imports: [DynamicForm, ReactiveFormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginForm!: FormGroup
  loginService = inject(LoginService);
  router = inject(Router);
  loaderService = inject(Loader);
  @Input() loginCredentials!: LoginInterface;

  constructor(private fb: FormBuilder) {
    this.loginForm = fb.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    debugger;
    this.loaderService.showLoader();
    this.loginService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
        this.loaderService.hideLoader();
      },
      error: (error) => {
        console.error('login failed:', error);
        this.loaderService.hideLoader();
      }
    })
  }

  get emailAddressControl(): FormControl {
    return this.loginForm.get('emailAddress') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  formJson: FieldConfigInterface[] = [
    {
      inputfield: {
        type: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        id: 'email',
        name: 'emailAddress',
        icon: 'email',
        hint: 'xyz123@gmail.com',
        disabled: false,
      }, validators: ['required']
    },
    {
      inputfield: {
        appearance: 'outline',
        type: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        id: 'password',
        name: 'password',
        icon: 'visibility',
        disabled: false,
        toggleIcon: true,
        toggleTypes: ['password', 'text'],
        toggleIcons: ['visibility', 'visibility_off']
      }, validators: ['required']
    },
    {
      inputfield: {
        name: 'rememberMe',
        label: 'Remember Me',
        type: 'checkbox',
        disabled: false,
        id: 'checkbox',
        appearance: 'outline',
        placeholder: '',
      }
    }
  ]

  onDynamicFormSubmit(loginCredentials: LoginInterface) {
    const secretKey = `${environment.secretKey}`;
    const encrypted = encryptedPayload(loginCredentials, secretKey);
    debugger;
    this.loaderService.showLoader();
    this.loginService.login(loginCredentials).subscribe({
      next: () => {
        this.loaderService.hideLoader();
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.loaderService.hideLoader();
        console.error('login failed:', error);
      }
    });
    console.log("Dynamic form submit:", loginCredentials);
  }

}