import { Routes } from "@angular/router";

const authRoutes: Routes = [
  {
    path: 'iniciar-sesion',
    loadComponent: () => import('./pages/login-page/login-page.component')
  },
  {
    path: 'registro',
    loadComponent: () => import('./pages/register-page/register-page.component')
  },
  {
    path: '',
    redirectTo: 'iniciar-sesion',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'iniciar-sesion',
    pathMatch: 'full'
  }
];

export default authRoutes;
