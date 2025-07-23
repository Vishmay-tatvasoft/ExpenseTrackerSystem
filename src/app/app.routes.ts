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
    ]
  },
  { path: 'dashboard', component: Dashboard }
];
