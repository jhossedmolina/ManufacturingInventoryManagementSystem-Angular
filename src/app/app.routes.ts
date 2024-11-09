import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'autenticacion',
    loadComponent: () => import('./auth/layouts/auth-layout/auth-layout.component'),
    children: [
      {
        path: '',
        loadChildren: () => import('./auth/auth.routes')
      }
    ]
  },
    /*children: [
      {
        path: 'iniciar-sesion',
        title: 'Iniciar Sesion',
        loadComponent: () => import('./auth/pages/login-page/login-page.component')
      },
      {
        path: 'registrarse',
        title: 'Registrarse',
        loadComponent: () => import('./auth/pages/register-page/register-page.component')
      }
    ]
  },*/
  {
    path: '',
    redirectTo: 'autenticacion',
    pathMatch: 'full'
  }
];
