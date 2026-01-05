export interface ConsentDto {
  consentId: string;
  consentType: string;
  isOk: boolean;
  status: string;
  createdAt: Date;
  revokedAt: Date;
}
