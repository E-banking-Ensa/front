import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AccountDTO } from '../models/AccountDTO';
import { TransactionDTO } from '../models/TransactionDTO';

/**
 * Service pour gérer les comptes bancaires
 * Endpoints: GET /api/accounts/client/{clientId}
 *            GET /api/accounts/{accountId}
 *            POST /api/accounts/createAccount
 *            PUT /api/accounts/{accountId}/status
 *            GET /api/accounts/{accountId}/balance
 *            GET /api/accounts/{accountId}/transactions
 *            GET /api/accounts/{accountId}/releve
 *            GET /api/accounts/nbrTotal
 *            GET /api/accounts/client/{clientId}/nbrAccount
 */
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = `${environment.apiUrl}/api/accounts`;

  constructor(private http: HttpClient) { }

  /**
   * Récupère tous les comptes d'un client
   * GET /api/accounts/client/{clientId}
   * @param clientId L'ID du client
   */
  getClientAccounts(clientId: string): Observable<AccountDTO[]> {
    return this.http.get<any>(`${this.baseUrl}/client/${clientId}`).pipe(
      map(response => response.accounts || []),
      catchError(this.handleError)
    );
  }

  /**
   * Récupère les informations d'un compte
   * GET /api/accounts/{accountId}
   * @param accountId L'ID du compte
   */
  getAccountById(accountId: number): Observable<AccountDTO> {
    return this.http.get<any>(`${this.baseUrl}/${accountId}`).pipe(
      map(response => response.account || response),
      catchError(this.handleError)
    );
  }

  /**
   * Récupère le solde d'un compte
   * GET /api/accounts/{accountId}/balance
   * @param accountId L'ID du compte
   */
  getAccountBalance(accountId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${accountId}/balance`).pipe(
      map(response => response.account || response),
      catchError(this.handleError)
    );
  }

  /**
   * Récupère les transactions d'un compte
   * GET /api/accounts/{accountId}/transactions
   * @param accountId L'ID du compte
   */
  getAccountTransactions(accountId: number): Observable<TransactionDTO[]> {
    return this.http.get<any>(`${this.baseUrl}/${accountId}/transactions`).pipe(
      map(response => response.transactions || []),
      catchError(this.handleError)
    );
  }

  /**
   * Récupère le relevé d'un compte (PDF)
   * GET /api/accounts/{accountId}/releve
   * @param accountId L'ID du compte
   */
  getAccountStatement(accountId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${accountId}/releve`, {
      responseType: 'blob'
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Crée un nouveau compte pour un client
   * POST /api/accounts/createAccount
   * @param userId L'ID de l'utilisateur
   * @param accountType Le type de compte (CHECKING, SAVINGS, BUSINESS, INVESTMENT)
   */
  createAccount(userId: string, accountType: string): Observable<AccountDTO> {
    const requestBody = {
      userId: userId,
      accountType: accountType
    };

    return this.http.post<any>(`${this.baseUrl}/createAccount`, requestBody).pipe(
      map(response => response.account || response),
      catchError(this.handleError)
    );
  }

  /**
   * Modifie le statut d'un compte
   * PUT /api/accounts/{accountId}/status
   * @param accountId L'ID du compte
   * @param accountStatus Le nouveau statut (ACTIVE, INACTIVE, SUSPENDED, PENDING, CLOSED)
   */
  updateAccountStatus(accountId: number, accountStatus: string): Observable<AccountDTO> {
    const requestBody = {
      accountStatus: accountStatus
    };

    return this.http.put<any>(`${this.baseUrl}/${accountId}/status`, requestBody).pipe(
      map(response => response.account || response),
      catchError(this.handleError)
    );
  }

  /**
   * Obtient le nombre total des comptes
   * GET /api/accounts/nbrTotal
   */
  getTotalAccountsCount(): Observable<number> {
    return this.http.get<any>(`${this.baseUrl}/nbrTotal`).pipe(
      map(response => response.totalAccounts || 0),
      catchError(this.handleError)
    );
  }

  /**
   * Obtient le nombre des comptes d'un client
   * GET /api/accounts/client/{clientId}/nbrAccount
   * @param clientId L'ID du client
   */
  getClientAccountsCount(clientId: string): Observable<number> {
    return this.http.get<any>(`${this.baseUrl}/client/${clientId}/nbrAccount`).pipe(
      map(response => response.nbrAccount || 0),
      catchError(this.handleError)
    );
  }

  /**
   * Gère les erreurs HTTP
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '❌ Une erreur est survenue';

    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Code: ${error.status} - ${error.statusText}`;
    }

    console.error('%c❌ Erreur Account Service:', 'color: red;', errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  /**
   * ALIAS POUR COMPATIBILITÉ RÉTROACTIVE
   * Utilise getClientAccounts() en interne
   * @param clientId L'ID du client
   */
  getAccounts(clientId: string): Observable<AccountDTO[]> {
    return this.getClientAccounts(clientId);
  }
}
