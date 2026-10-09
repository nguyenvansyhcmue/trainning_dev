import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (_, state) => inject(TokenService).token ? true : inject(Router).createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
