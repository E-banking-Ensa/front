import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AccountDTO } from '../models/AccountDTO ';

/**
 * NOTE: The openapi.yml does not define endpoints for account management.
 * This service uses mock data until the backend API is extended.
 */
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = '......'; // à définir plus tard pour le microservice

  constructor(private http: HttpClient) { }

  // Récupérer les comptes d'un client
  getAccounts(clientId: string): Observable<AccountDTO[]> {
    // Exemple de données simulées
    const mockAccounts: AccountDTO[] = [
      {
        accountId: 1,
        accountType: 'Courant',
        balance: 1200.50,
        currency: 'EUR',
        rib: 'FR7612345678901234567890123',
        accountStatus: 'actif',
        createdDate: new Date('2024-01-15'),
        userId: clientId
      },
      {
        accountId: 2,
        accountType: 'Épargne',
        balance: 5000.00,
        currency: 'EUR',
        rib: 'FR7612345678901234567890456',
        accountStatus: 'actif',
        createdDate: new Date('2024-03-20'),
        userId: clientId
      },
      {
        accountId: 3,
        accountType: 'Courant',
        balance: 0,
        currency: 'USD',
        rib: 'US001234567890987654321',
        accountStatus: 'inactif',
        createdDate: new Date('2023-07-10'),
        userId: clientId
      }
    ];

    // Retourne un Observable simulé
    return of(mockAccounts);

    // Quand le backend sera prêt, remplacer par:
    // return this.http.get<AccountDTO[]>(`${this.baseUrl}/clients/${clientId}/accounts`);
  }

  //faire recuprer le nombre des accounts
  getNbrAccounts(): Observable<number> {
    // Quand le backend sera prêt, remplacer par:
    // return this.http.get<AccountDTO[]>(`${this.baseUrl}/clients/${clientId}/accounts`);
    return of(100);
  }

}
