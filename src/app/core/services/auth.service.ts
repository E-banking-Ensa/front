import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LoginRequest {
    username?: string;
    password?: string;
    scope?: string;
}

export interface SignupRequest {
    username: string;
    email?: string;
    firstName: string;
    lastName: string;
    password?: string;
    phoneNumber: string;
    address: string;
    roles: string[];
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = environment.apiUrl;
    private readonly TOKEN_KEY = 'auth_token';
    private readonly USER_KEY = 'auth_user'; // For storing user claim details if needed

    constructor(private http: HttpClient) { }

    login(credentials: LoginRequest): Observable<any> {
        return this.http.post(`${this.apiUrl}/api/auth/login`, credentials).pipe(
            tap((response: any) => {
                if (response && response.access_token) {
                    this.saveToken(response.access_token);
                } else if (response && response.token) {
                    this.saveToken(response.token);
                }
            })
        );
    }

    register(data: SignupRequest): Observable<any> {
        return this.http.post(`${this.apiUrl}/api/auth/logup`, data);
    }

    recoverPassword(data: { email?: string, username?: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/api/auth/password/recover`, data);
    }

    logout(): Observable<any> {
        const headers = new HttpHeaders({
            'X-Refresh-Token': 'refresh_token_placeholder' // TODO: Get actual refresh token from storage
        });
        return this.http.post(`${this.apiUrl}/api/auth/logout`, {}, { headers }).pipe(
            tap(() => this.clearSession()),
            tap({ error: () => this.clearSession() })
        );
    }

    // me() endpoint not available in OpenAPI spec
    // me(): Observable<any> { ... }

    // Token Management
    saveToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    clearSession(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        // Basic check. In production, check expiration (JWT decode)
        return !!token;
    }
}
