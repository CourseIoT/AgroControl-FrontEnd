import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {AuthStatus} from "../models/auth-status.enum";

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() === AuthStatus.authenticated) {
    // Obtener datos del localStorage
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    const userId = localStorage.getItem('userId');

    // Redirigir según el rol
    if (roles.includes('ROLE_AGRICULTURAL_PRODUCER')) {
      router.navigateByUrl('/fields');
    } else if (roles.includes('ROLE_DISTRIBUTOR') && userId) {
      router.navigateByUrl(`/home-distributor/${userId}`);
    }

    return false; // Previene el acceso a la ruta actual
  }

  return true; // Permitir acceso a la ruta si no está autenticado
};
