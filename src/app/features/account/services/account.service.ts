import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = 'http://localhost:8080/api/accounts';

  constructor(private http: HttpClient) {}

  createAccount(userId: string, accountType: string): Observable<any> {
    const body = {
      userId: userId,
      accountType: accountType
    };

    return this.http.post(
      `${this.apiUrl}/createAccount`,
      body
    );
  }
}
