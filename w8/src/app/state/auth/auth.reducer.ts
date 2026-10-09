import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthState } from '../../core/models/auth.models';
import * as AuthActions from './auth.actions';
const initialState: AuthState = { token: null, username: null, role: null, loading: false, error: null };
export const authFeature = createFeature({ name: 'auth', reducer: createReducer(initialState,
  on(AuthActions.login, state => ({ ...state, loading: true, error: null })),
  on(AuthActions.loginSuccess, (state, { response }) => ({ ...state, token: response.accessToken, username: response.username, role: response.role, loading: false })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(AuthActions.logout, () => initialState)
)});
