export interface KycDocumentResponseDto {
  id: string;
  documentType: string;
  status: string;
  pathToDocument: string;
  uploadedAt: Date;
  reviewedAt: Date;
  reviewComment: string;
}
