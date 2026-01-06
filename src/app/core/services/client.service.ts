import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin, map } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ClientDto } from '../models/ClientDto';
import { environment } from '../../../environments/environment';
import { AccountDTO } from '../models/AccountDTO';
import { TransactionDTO } from '../models/TransactionDTO';
import { AccountType } from '../models/AccountType.enum';
import { AccountStatus } from '../models/AccountStatus.enum';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = `${environment.apiUrl}/api/users`;
  private paymentUrl = `${environment.apiUrl}/api/payments`;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) { }

  /**
   * Récupère tous les clients
   */
  getAllClients(): Observable<ClientDto[]> {
    return this.http.get<ClientDto[]>(`${this.baseUrl}/allClients`);
  }

  /**
   * Récupère un client par ID avec ses comptes
   * GET /api/users/client/{clientId}
   * + GET /api/accounts/client/{clientId} (pour les comptes)
   */
  getClient(clientId: string): Observable<ClientDto> {
    return this.http.get<ClientDto>(`${this.baseUrl}/client/${clientId}`).pipe(
      // Charger aussi les comptes du client
      map((client: ClientDto) => {
        // Récupérer les comptes du client
        this.accountService.getClientAccounts(clientId).subscribe({
          next: (accounts: AccountDTO[]) => {
            client.accounts = accounts;
          },
          error: (err) => console.error('Erreur lors du chargement des comptes:', err)
        });
        return client;
      })
    );
  }

  /**
   * Récupère un client et ses comptes complètement
   * Utilise forkJoin pour charger client + comptes en parallèle
   */
  getClientWithAccounts(clientId: string): Observable<ClientDto> {
    return forkJoin({
      client: this.http.get<ClientDto>(`${this.baseUrl}/client/${clientId}`),
      accounts: this.accountService.getClientAccounts(clientId)
    }).pipe(
      map(({ client, accounts }) => ({
        ...client,
        accounts: accounts
      }))
    );
  }

  /**
   * Désactive un client
   */
  desactivate(clientId: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/clients/${clientId}/desactivate`, {});
  }

  /**
   * Active un client
   */
  activate(clientId: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/clients/${clientId}/activate`, {});
  }

  /**
   * Récupère le client actuel (connecté)
   */
  getCurrentClient(): Observable<ClientDto> {
    // TODO: Récupérer l'ID du client depuis le token ou le contexte
    return of({} as ClientDto);
  }

  /**
   * Récupère les comptes d'un client
   * Utilise AccountService pour récupérer les comptes réels du backend
   * GET /api/accounts/client/{clientId}
   */
  getClientAccounts(clientId: string): Observable<AccountDTO[]> {
    return this.accountService.getClientAccounts(clientId);
  }

  /**
   * Récupère les transactions d'un compte
   * Utilise AccountService
   * GET /api/accounts/{accountId}/transactions
   */
  getAccountTransactions(accountId: number): Observable<TransactionDTO[]> {
    return this.accountService.getAccountTransactions(accountId);
  }

  /**
   * Effectue un virement
   * POST /api/payments/virement
   */
  transferMoney(transferData: any): Observable<any> {
    return this.http.post(`${this.paymentUrl}/virement`, transferData);
  }

  /**
   * Effectue une recharge mobile
   * POST /api/payments/recharge
   */
  mobileRecharge(rechargeData: any): Observable<any> {
    return this.http.post(`${this.paymentUrl}/recharge`, rechargeData);
  }
}
