import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {AuthStatus} from "../models/auth-status.enum";

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log('Estado de autenticación:', authService.authStatus());
  if ( authService.authStatus() === AuthStatus.authenticated ) {
    return true;
  }
  router.navigateByUrl('/login');
  return false;
};
