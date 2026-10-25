import { Route, Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then(m => m.Register),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('@fincore-platform/admin')
        .then((m) => m.ADMIN_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
