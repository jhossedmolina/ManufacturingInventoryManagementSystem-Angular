import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

 const authServive = inject( AuthService );
 const router = inject( Router );

 if (authServive.authStatus() === AuthStatus.authenticated) {
  return true;
 }

 router.navigateByUrl('/autenticacion/iniciar-sesion')

 return false;
};
