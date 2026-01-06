import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { ClientService } from '../../../core/services/client.service';
import { ClientDto } from '../../../core/models/ClientDto';
import { AccountDTO } from '../../../core/models/AccountDTO';
import { TransactionDTO } from '../../../core/models/TransactionDTO';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule
  ]
})
export class ClientDashboardComponent implements OnInit {
  currentClient: ClientDto | null = null;
  accounts: AccountDTO[] = [];
  recentTransactions: TransactionDTO[] = [];
  selectedAccountId: number | null = null;

  constructor(
    private clientService: ClientService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // ✅ DONNÉES DE TEST - Pour affichage immédiat
    const mockTestData = this.createMockClientData();
    console.log('%c📦 DONNÉES DE TEST DASHBOARD CLIENT:', 'color: #FF6B6B; font-weight: bold;', mockTestData);

    this.clientService.getCurrentClient().subscribe({
      next: (client) => {
        // Fusionner avec les données de test (backend prioritaire)
        this.currentClient = { ...mockTestData, ...client };
        this.accounts = this.currentClient.accounts;

        // Sélectionner la première carte par défaut
        if (this.accounts.length > 0) {
          this.selectedAccountId = this.accounts[0].accountId;
        }

        this.loadRecentTransactions();
        this.cd.detectChanges();
        console.log('%c✅ Dashboard client chargé (Backend + Test):', 'color: green;', this.currentClient);
      },
      error: (err) => {
        // En cas d'erreur, utiliser les données de test
        console.warn('%c⚠️ Backend indisponible, utilisation des données de test:', 'color: orange;', err);
        this.currentClient = mockTestData;
        this.accounts = this.currentClient.accounts;

        if (this.accounts.length > 0) {
          this.selectedAccountId = this.accounts[0].accountId;
        }

        this.loadRecentTransactions();
        this.cd.detectChanges();
        console.log('%c📦 Dashboard affiché depuis les données de test:', 'color: #4ECDC4;', this.currentClient);
      }
    });
  }

  /**
   * Crée les données de test pour le dashboard client
   */
  private createMockClientData(): ClientDto {
    const now = new Date();
    
    return {
      clientId: 'CL100001',
      firstName: 'Ahmed',
      lastName: 'Ben Ali',
      username: 'ahmed.ben.ali',
      email: 'ahmed.benali@example.com',
      phoneNumber: '+212612345678',
      adresse: 'Rabat, Maroc',
      kycStatus: 'VERIFIED',
      status: 'ACTIVE',
      createdAt: new Date('2024-01-15'),
      accounts: [
        {
          accountId: 1001,
          userId: 'CL100001',
          rib: 'FR1420041010050500013M02606',
          accountType: 'CHECKING',
          accountStatus: 'ACTIVE',
          balance: 15750.50,
          currency: 'MAD',
          createdDate: '2024-01-15T10:30:00Z',
          transactions: [
            { typeTransaction: 'DEBIT', montant: -250.00, date: new Date(now.getTime() - 1000 * 60 * 60 * 2).toISOString(), motif: 'Achat - Supermarché' },
            { typeTransaction: 'CREDIT', montant: 1500.00, date: new Date(now.getTime() - 1000 * 60 * 60 * 4).toISOString(), motif: 'Salaire' },
            { typeTransaction: 'DEBIT', montant: -80.00, date: new Date(now.getTime() - 1000 * 60 * 60 * 6).toISOString(), motif: 'Électricité' },
            { typeTransaction: 'DEBIT', montant: -45.50, date: new Date(now.getTime() - 1000 * 60 * 60 * 8).toISOString(), motif: 'Internet' },
            { typeTransaction: 'CREDIT', montant: 200.00, date: new Date(now.getTime() - 1000 * 60 * 60 * 24).toISOString(), motif: 'Remboursement' }
          ]
        },
        {
          accountId: 1002,
          userId: 'CL100001',
          rib: 'FR1420041010050500013M02607',
          accountType: 'SAVINGS',
          accountStatus: 'ACTIVE',
          balance: 50000.00,
          currency: 'MAD',
          createdDate: '2024-02-20T14:15:00Z',
          transactions: [
            { typeTransaction: 'CREDIT', montant: 5000.00, date: new Date(now.getTime() - 1000 * 60 * 60 * 72).toISOString(), motif: 'Dépôt d\'épargne' }
          ]
        },
        {
          accountId: 1003,
          userId: 'CL100001',
          rib: 'FR1420041010050500013M02608',
          accountType: 'INVESTMENT',
          accountStatus: 'ACTIVE',
          balance: 25500.75,
          currency: 'MAD',
          createdDate: '2024-03-10T09:45:00Z',
          transactions: [
            { typeTransaction: 'CREDIT', montant: 500.00, date: new Date(now.getTime() - 1000 * 60 * 60 * 120).toISOString(), motif: 'Intérêts d\'investissement' }
          ]
        }
      ]
    };
  }

  // ===================== SELECTION =====================
  selectAccount(accountId: number): void {
    this.selectedAccountId = accountId;
  }

  isAccountSelected(accountId: number): boolean {
    return this.selectedAccountId === accountId;
  }

  getSelectedTransactions(): TransactionDTO[] {
    if (!this.selectedAccountId) return [];
    const account = this.accounts.find(a => a.accountId === this.selectedAccountId);
    return account ? (account.transactions ?? []) : [];
  }

  // ===================== TRANSACTIONS =====================
  loadRecentTransactions(): void {
    this.recentTransactions = this.accounts
      .flatMap(a => a.transactions ?? [])
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);
  }

  isTransactionPositive(t: TransactionDTO): boolean {
    return t.montant > 0;
  }

  formatAmount(amount: number): string {
    const sign = amount > 0 ? '+' : '';
    return `${sign}${amount} MAD`;
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR');
  }



  getStatusColor(status: string): string {
  const colors: { [key: string]: string } = {
    'ACTIVE': '#78f4acff',
    'INACTIVE': '#dadadaff',
    'SUSPENDED': '#F5C36B',
    'PENDING': '#71d4ffff',
    'CLOSED': '#f77979ff'
  };
  return colors[status] || '#6c757d';
}


}
