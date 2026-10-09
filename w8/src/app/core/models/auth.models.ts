export interface LoginRequest { username: string; password: string; }
export interface LoginResponse { accessToken: string; username: string; role: string; }
export interface AuthIdentity { username: string; role: string; }
export interface AuthState { token: string | null; username: string | null; role: string | null; loading: boolean; error: string | null; }
