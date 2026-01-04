import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ClientDTOS } from '../models/ClientDTOS';
import { AccountDTO } from '../models/AccountDTO';
import { TransactionDTO } from '../models/TransactionDTO';
import { AccountType } from '../models/AccountType.enum';
import { AccountStatus } from '../models/AccountStatus.enum';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  // Données mockées - à remplacer par des appels HTTP
  private mockClient: ClientDTOS = {
    userId: 'CL100001',
    firstName: 'client',
    lastName: '1',
    status: 'Active',
    accounts: [
      {
        accountId: 1,
        userId: 'CL100001',
        rib: '23078071537634',
        accountType: AccountType.SAVINGS,
        accountStatus: AccountStatus.PENDING,
        balance: 1000.0,
        currency: 'DH',
        createdDate: '2024-01-15T10:30:00',
        transactions: [
          {
            typeTransaction: 'Virement Entrant',
            montant: 1000,
            date: '2026-01-28T14:30:00',
            motif: 'Transfert reçu'
          },
          {
            typeTransaction: 'Virement Entrant',
            montant: 1000,
            date: '2026-01-28T10:15:00',
            motif: 'Transfert reçu'
          },
          {
            typeTransaction: 'Virement',
            montant: -500,
            date: '2026-01-02T16:45:00',
            motif: 'Paiement fournisseur'
          },
          {
            typeTransaction: 'Deposit',
            montant: 200,
            date: '2026-01-25T09:20:00',
            motif: 'Dépôt espèces'
          }
        ]
      },
      {
        accountId: 2,
        userId: 'CL100001',
        rib: '23078071537635',
        accountType: AccountType.SAVINGS,
        accountStatus: AccountStatus.PENDING,
        balance: 1000.0,
        currency: 'DH',
        createdDate: '2024-02-20T14:00:00',
        transactions: [
          {
            typeTransaction: 'Virement Entrant',
            montant: 800,
            date: '2026-01-27T11:00:00',
            motif: 'Salaire'
          }
        ]
      },
      {
        accountId: 3,
        userId: 'CL100001',
        rib: '23078071537636',
        accountType: AccountType.CHECKING,
        accountStatus: AccountStatus.ACTIVE,
        balance: 5200.0,
        currency: 'DH',
        createdDate: '2024-03-10T09:00:00',
        transactions: [
          {
            typeTransaction: 'Virement',
            montant: -150,
            date: '2026-01-26T15:30:00',
            motif: 'Facture électricité'
          }
        ]
      },
      {
        accountId: 4,
        userId: 'CL100001',
        rib: '23078071537637',
        accountType: AccountType.BUSINESS,
        accountStatus: AccountStatus.ACTIVE,
        balance: 15000.0,
        currency: 'DH',
        createdDate: '2024-04-05T11:30:00',
        transactions: []
      }
    ]
  };

  constructor() { }

  /**
   * Récupère les informations du client connecté
   * TODO: Remplacer par un appel HTTP réel
   * return this.http.get<ClientDto>(`${API_URL}/clients/me`)
   */
  getCurrentClient(): Observable<ClientDTOS> {
    return of(this.mockClient).pipe(delay(300));
  }

  /**
   * Récupère les comptes d'un client
   * TODO: Remplacer par un appel HTTP réel
   * return this.http.get<AccountDTO[]>(`${API_URL}/clients/${userId}/accounts`)
   */
  getClientAccounts(userId: string): Observable<AccountDTO[]> {
    return of(this.mockClient.accounts).pipe(delay(300));
  }

  /**
   * Récupère les transactions d'un compte
   * TODO: Remplacer par un appel HTTP réel
   * return this.http.get<TransactionDTO[]>(`${API_URL}/accounts/${accountId}/transactions`)
   */
  getAccountTransactions(accountId: number): Observable<TransactionDTO[]> {
    const account = this.mockClient.accounts.find(a => a.accountId === accountId);
    return of(account?.transactions || []).pipe(delay(300));
  }

  /**
   * Effectue un transfert d'argent
   * TODO: Remplacer par un appel HTTP réel
   * return this.http.post(`${API_URL}/transfers`, transferData)
   */
  transferMoney(transferData: any): Observable<any> {
    console.log('Transfer data:', transferData);
    return of({ success: true, message: 'Transfert effectué avec succès' }).pipe(delay(500));
  }

  /**
   * Effectue une recharge mobile
   * TODO: Remplacer par un appel HTTP réel
   * return this.http.post(`${API_URL}/mobile-recharge`, rechargeData)
   */
  mobileRecharge(rechargeData: any): Observable<any> {
    console.log('Recharge data:', rechargeData);
    return of({ success: true, message: 'Recharge effectuée avec succès' }).pipe(delay(500));
  }
}
