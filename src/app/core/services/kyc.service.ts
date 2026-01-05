//faire le service pour recuperer les documents KYC
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashbordAdmin } from '../models/DashbordAdmin';
import { KycDocumentResponseDto } from '../models/KycDocumentResponseDto';
@Injectable({
  providedIn: 'root'
})
export class KycService {

  private baseUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) {}

  // 🔹 Recupere le skyc documents d'un tel client
  getKycDocuments(clientId: string): Observable<KycDocumentResponseDto[]> {
    return this.http.get<KycDocumentResponseDto[]>(`${this.baseUrl}/clients/${clientId}/kyc-documents`);
  }

  //valider un document KYC
  validateKycDocument(documentId: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/kyc/documents/${documentId}/approve`, {});
  }

  //rejeter un document KYC
  rejectKycDocument(documentId: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/kyc/documents/${documentId}/reject`, {});
  }
}
