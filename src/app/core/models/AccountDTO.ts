// ========================================
// src/app/core/models/AccountDTO.ts
// ========================================
import { TransactionDTO } from './TransactionDTO';
import { AccountType } from './AccountType.enum';
import { AccountStatus } from './AccountStatus.enum';

export interface AccountDTO {
  accountId: number;
  userId: string;           // UUID → string
  rib: string;
  accountType: AccountType;
  accountStatus: AccountStatus;
  balance: number;
  currency: string;
  createdDate: string;      // LocalDateTime → ISO string
  transactions: TransactionDTO[];
}
