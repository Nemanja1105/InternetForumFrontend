import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../services/TokenService/token-service.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);
  if (!tokenService.isLoggin())
    return true;
  router.navigate(['']);
  return true;
};
