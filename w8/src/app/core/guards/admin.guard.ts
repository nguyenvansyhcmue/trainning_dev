import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const adminGuard: CanActivateFn = (_, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  return tokenService.identity?.role === 'admin'
    ? true
    : router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};
