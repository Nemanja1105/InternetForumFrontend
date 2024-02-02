import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const verifyGuard: CanActivateFn = (route, state) => {
  let item = sessionStorage.getItem("FIRST_PART_LOGIN");
  const router = inject(Router);
  if (item) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
