// ========================================
// src/app/core/models/AccountDTO.ts
// ========================================
import { TransactionDTO } from './TransactionDTO';
import { AccountType } from './AccountType.enum';
import { AccountStatus } from './AccountStatus.enum';

export interface AccountDTO {
  accountId: number;
  userId?: string;              // From backend response
  clientId?: string;            // Alternative field
  rib: string;
  accountType: AccountType | string;  // Accept both enum and string
  accountStatus: AccountStatus | string;  // Accept both enum and string
  balance: number;
  currency: string;
  createdDate: string;      // ISO string format
  transactions?: TransactionDTO[];  // Optional - might not be included in list endpoint
}
