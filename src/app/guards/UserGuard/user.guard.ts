import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../services/TokenService/token-service.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);
  const user = tokenService.getUser();
  if (user.role === 'Admin') return true;
  router.navigate(['']);
  return false;
};
