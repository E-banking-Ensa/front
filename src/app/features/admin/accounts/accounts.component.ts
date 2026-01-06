import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ← IMPORTANT pour ngModel
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AccountService } from '../../../core/services/account.service';
import { AccountDTO } from '../../../core/models/AccountDTO';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  clientId!: string;
  clientName!: string;
  accounts: AccountDTO[] = [];
  filteredAccounts: AccountDTO[] = [];
  displayedColumns: string[] = ['accountId', 'accountType', 'balance', 'currency', 'accountStatus'];

  searchTerm: string = '';

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('clientId') || '';
    this.clientName=this.route.snapshot.paramMap.get('name') || '';
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.accountService.getAccounts(this.clientId).subscribe({
      next: (accounts) => {
        this.accounts = accounts;
        this.filteredAccounts = accounts;
      },
      error: (err) => console.error(err)
    });
  }

  filterAccounts(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredAccounts = this.accounts.filter(
      acc =>
        acc.accountType.toLowerCase().includes(term) ||
        acc.accountStatus.toLowerCase().includes(term) ||
        acc.currency.toLowerCase().includes(term) ||
        acc.accountId.toString().includes(term)
    );
  }
}
