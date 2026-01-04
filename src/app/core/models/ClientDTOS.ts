// ========================================
// src/app/core/models/ClientDto.ts
// ========================================
import { AccountDTO } from './AccountDTO';

export interface ClientDTOS {
  userId: string;          // UUID → string
  firstName: string;
  lastName: string;
  status: string;
  accounts: AccountDTO[];
}
