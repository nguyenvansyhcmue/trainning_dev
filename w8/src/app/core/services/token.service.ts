import { Injectable } from '@angular/core';
import { AuthIdentity } from '../models/auth.models';
const TOKEN_KEY = 'w8.access_token';
const USER_KEY = 'w8.user';
const AUTH_EXPIRES_AT_KEY = 'w8.auth_expires_at';
const SESSION_DURATION_MS = 60 * 1000;

@Injectable({ providedIn: 'root' })
export class TokenService {
  get token(): string | null {
    if (this.isSessionExpired()) {
      this.clearAuthentication();
      return null;
    }

    return localStorage.getItem(TOKEN_KEY);
  }
  saveAuthentication(token: string, username: string, role: string): void {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify({ username, role }));
    localStorage.setItem(AUTH_EXPIRES_AT_KEY, String(Date.now() + SESSION_DURATION_MS));
  }

  clearAuthentication(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(AUTH_EXPIRES_AT_KEY);
  }

  get identity(): AuthIdentity | null {
    if (!this.token) return null;
    const value = localStorage.getItem(USER_KEY);
    if (!value) return null;
    try {
      return JSON.parse(value) as AuthIdentity;
    } catch {
      this.clearAuthentication();
      return null;
    }
  }

  private isSessionExpired(): boolean {
    const expiresAt = Number(localStorage.getItem(AUTH_EXPIRES_AT_KEY));
    return !expiresAt || Date.now() >= expiresAt;
  }
}
