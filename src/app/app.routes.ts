import { Routes } from '@angular/router';
import { Auth } from './features/auth/auth';
import { Dashboard } from './features/dashboard/dashboard';
import { entryGuard } from './core/guards/entry-guard';
import { authGuard } from './core/guards/auth-guard';
import { unsavedChangesGuard } from './core/guards/unsaved-changes-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    component: Auth,
    canActivate: [entryGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', loadComponent: () => import("./features/auth/login/login").then(m => m.Login), canDeactivate: [unsavedChangesGuard] },
      { path: 'register', loadComponent: () => import("./features/auth/register/register").then(m => m.Register), canDeactivate: [unsavedChangesGuard] },
      { path: 'forgot-password', loadComponent: () => import("./features/auth/forgot-password/forgot-password").then(m => m.ForgotPassword) },
      { path: 'otp-verification', loadComponent: () => import("./features/auth/otp-verification/otp-verification").then(m => m.OtpVerification) },
      { path: 'change-password', loadComponent: () => import("./features/auth/change-password/change-password").then(m => m.ChangePassword), canDeactivate: [unsavedChangesGuard] }
    ]
  },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] }
];