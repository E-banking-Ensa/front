// ========================================
// src/app/core/models/TransactionDTO.ts
// ========================================
export interface TransactionDTO {
  typeTransaction: string;
  montant: number;
  date: string;     // LocalDateTime → ISO string
  motif: string;
}
