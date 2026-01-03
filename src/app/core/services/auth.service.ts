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
        return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
            tap((response: any) => {
                // Assuming the response contains an access_token or similiar
                // Adjust based on actual API response structure. 
                // If response is just { access_token: "..." }
                if (response && response.access_token) {
                    this.saveToken(response.access_token);
                } else if (response && response.token) {
                    this.saveToken(response.token);
                }
            })
        );
    }

    register(data: SignupRequest): Observable<any> {
        return this.http.post(`${this.apiUrl}/logup`, data);
    }

    recoverPassword(data: { email?: string, username?: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/password/recover`, data);
    }

    logout(): Observable<any> {
        // API requires X-Refresh-Token header if available, but for now we just handle local logout primarily
        // If backend requires a call:
        const headers = new HttpHeaders({
            // 'X-Refresh-Token': this.getRefreshToken() // If we had one
        });

        // We can fire and forget or wait
        return this.http.post(`${this.apiUrl}/logout`, {}, { headers }).pipe(
            tap(() => this.clearSession()),
            // Catch error to ensure local logout happens anyway
            tap({ error: () => this.clearSession() })
        );
    }

    me(): Observable<any> {
        return this.http.get(`${this.apiUrl}/api/auth/me`);
    }

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
