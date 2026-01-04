import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

import { ClientService } from '../../../core/services/clients.service';
import { ClientDTOS } from '../../../core/models/ClientDTOS';
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

  currentClient: ClientDTOS | null = null;
  accounts: AccountDTO[] = [];
  recentTransactions: TransactionDTO[] = [];

  hoveredAccountId: number | null = null;
  selectedAccountId: number | null = null; // pour le clic

  constructor(
    private clientService: ClientService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.clientService.getCurrentClient().subscribe(client => {
      this.currentClient = client;
      this.accounts = client.accounts;
      this.loadRecentTransactions();
      this.cd.detectChanges();
    });
  }

  // ===================== HOVER =====================
  onAccountHover(accountId: number): void {
    this.hoveredAccountId = accountId;
  }

  onAccountLeave(): void {
    this.hoveredAccountId = null;
  }

  getHoveredTransactions(): TransactionDTO[] {
    const account = this.accounts.find(a => a.accountId === this.hoveredAccountId);
    return account ? account.transactions : [];
  }

  // ===================== CLICK =====================
  selectAccount(accountId: number): void {
    this.selectedAccountId = accountId;
  }

  getSelectedTransactions(): TransactionDTO[] {
    const account = this.accounts.find(a => a.accountId === this.selectedAccountId);
    return account ? account.transactions : [];
  }

  // ===================== TRANSACTIONS =====================
  loadRecentTransactions(): void {
    this.recentTransactions = this.accounts
      .flatMap(a => a.transactions)
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
}
