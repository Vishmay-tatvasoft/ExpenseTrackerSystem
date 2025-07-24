import { Component, inject, Input } from '@angular/core';
import { CustomInput } from '../../../shared/components/custom-input/custom-input';
import { LoginInterface } from '../../../core/models/login.interface';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../core/services/auth/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CustomInput, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginForm!:FormGroup
  loginService = inject(LoginService);
  router = inject(Router);
  @Input() loginCredentials!:LoginInterface;

  constructor(private fb: FormBuilder) {
    this.loginForm = fb.group({
      emailAddress: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required]]
    });
  }

  onSubmit(): void{
    if(this.loginForm.invalid) return;
    this.loginService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('login failed:', error);
      }
    })
  }

  get emailAddressControl(): FormControl{
    return this.loginForm.get('emailAddress') as FormControl;
  }

  get passwordControl(): FormControl{
    return this.loginForm.get('password') as FormControl;
  }

}