import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap, of, tap } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { TokenService } from '../../core/services/token.service';
import { Router } from '@angular/router';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);
  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);
  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.login),
    exhaustMap(({ request }) => this.authService.login(request).pipe(
      map(response => AuthActions.loginSuccess({ response })),
      catchError(() => of(AuthActions.loginFailure({ error: 'Đăng nhập không thành công.' })))
    ))
  ));
  persistLogin$ = createEffect(() => this.actions$.pipe(ofType(AuthActions.loginSuccess), tap(({ response }) => this.tokenService.saveAuthentication(response.accessToken, response.username, response.role))), { dispatch: false });
  navigateAfterLogin$ = createEffect(() => this.actions$.pipe(ofType(AuthActions.loginSuccess), tap(() => this.router.navigate(['/students']))), { dispatch: false });
  clearLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.tokenService.clearAuthentication();
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}
