//faire le service pour recuperer les documents KYC
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DashbordAdmin } from '../models/DashbordAdmin';
import { KycDocumentResponseDto } from '../models/KycDocumentResponseDto';

@Injectable({
  providedIn: 'root'
})
export class KycService {

  private baseUrl = `${environment.apiUrl}/api/users`;

  constructor(private http: HttpClient) { }

  /**
   * Récupère les documents KYC d'un utilisateur
   * GET /api/users/{userId}/kyc/documents
   */
  getKycDocuments(userId: string): Observable<KycDocumentResponseDto[]> {
    return this.http.get<KycDocumentResponseDto[]>(`${this.baseUrl}/${userId}/kyc/documents`);
  }

  /**
   * Upload un document KYC pour un utilisateur
   * POST /api/users/{userId}/kyc/documents?documentType={type}
   */
  uploadKycDocument(userId: string, documentType: string, file: File): Observable<void> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<void>(`${this.baseUrl}/${userId}/kyc/documents?documentType=${documentType}`, formData);
  }

  /**
   * Valider un document KYC
   * PUT /api/users/kyc/documents/{documentId}/approve
   */
  validateKycDocument(documentId: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/kyc/documents/${documentId}/approve`, {});
  }

  /**
   * Rejeter un document KYC
   * PUT /api/users/kyc/documents/{documentId}/reject?reason={reason}
   */
  rejectKycDocument(documentId: string, reason: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/kyc/documents/${documentId}/reject?reason=${encodeURIComponent(reason)}`, {});
  }
}
