import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api.config';
import { LoginRequest, LoginResponse } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  login(request: LoginRequest): Observable<LoginResponse> { return this.http.post<LoginResponse>(`${API_BASE_URL}/auth/login`, request); }
}
