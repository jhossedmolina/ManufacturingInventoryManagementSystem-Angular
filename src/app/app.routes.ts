import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';

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
  {
    path: 'productos',
    loadComponent: () => import('./product/layouts/product-layout/product-layout.component'),
    canActivate: [ isAuthenticatedGuard ],
    children: [
      {
        path: '',
        loadChildren: () => import('./product/product.routes')
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
