import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ClientDto } from '../models/ClientDto';
import { environment } from '../../../environments/environment';
import { AccountDTO } from '../models/AccountDTO';
import { TransactionDTO } from '../models/TransactionDTO';
import { AccountType } from '../models/AccountType.enum';
import { AccountStatus } from '../models/AccountStatus.enum';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = `${environment.apiUrl}/api/users`;
  private paymentUrl = `${environment.apiUrl}/api/payments`;

  constructor(private http: HttpClient) { }

  getAllClients(): Observable<ClientDto[]> {
    return this.http.get<ClientDto[]>(`${this.baseUrl}/allClients`);
  }

  getClient(clientId: string): Observable<ClientDto> {
    return this.http.get<ClientDto>(`${this.baseUrl}/client/${clientId}`);
  }

  desactivate(clientId: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/clients/${clientId}/desactivate`, {});
  }

  activate(clientId: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/clients/${clientId}/activate`, {});
  }

  // Endpoints below are not in the provided OpenAPI spec or require different services

  /**
   * No 'me' endpoint in User Service spec.
   */
  getCurrentClient(): Observable<ClientDto> {
    // TODO: Implement valid logic to get current client, possibly by ID from token
    return of({} as ClientDto);
  }

  /**
   * No endpoint for fetching accounts in OpenAPI spec.
   */
  getClientAccounts(clientId: string): Observable<AccountDTO[]> {
    return of([]);
  }

  /**
   * No endpoint for fetching transactions in OpenAPI spec.
   */
  getAccountTransactions(accountId: number): Observable<TransactionDTO[]> {
    return of([]);
  }

  transferMoney(transferData: any): Observable<any> {
    return this.http.post(`${this.paymentUrl}/virement`, transferData);
  }

  mobileRecharge(rechargeData: any): Observable<any> {
    return this.http.post(`${this.paymentUrl}/recharge`, rechargeData);
  }
}
