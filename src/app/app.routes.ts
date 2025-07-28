import { Routes } from '@angular/router';
import { Auth } from './features/auth/auth';
import { Dashboard } from './features/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    component: Auth,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', loadComponent: () => import("./features/auth/login/login").then(m => m.Login) },
      { path: 'register', loadComponent: () => import("./features/auth/register/register").then(m => m.Register) },
      { path: 'forgot-password', loadComponent: () => import("./features/auth/forgot-password/forgot-password").then(m => m.ForgotPassword) },
      { path: 'otp-verification', loadComponent: () => import("./features/auth/otp-verification/otp-verification").then(m => m.OtpVerification) },
      { path: 'change-password', loadComponent: () => import("./features/auth/change-password/change-password").then(m => m.ChangePassword) }
    ]
  },
  { path: 'dashboard', component: Dashboard }
];
