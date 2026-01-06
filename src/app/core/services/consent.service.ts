import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ConsentTypeDto } from '../models/ConsentTypeDto';
import { ConsentDto } from '../models/consentDto';
import { ConsentTypeRequest } from '../models/ConsentTypeRequest';

@Injectable({
  providedIn: 'root'
})
export class ConsentService {

  private baseUrl = `${environment.apiUrl}/api/users`;

  constructor(private http: HttpClient) { }

  // ===== User Consents =====

  /**
   * Récupérer les consentements d'un utilisateur
   * GET /api/users/{userId}/consents
   */
  getUserConsents(userId: string): Observable<ConsentDto[]> {
    return this.http.get<ConsentDto[]>(`${this.baseUrl}/${userId}/consents`);
  }

  /**
   * Ajouter un consentement pour un utilisateur
   * POST /api/users/{userId}/consents?consentType={type}
   */
  addUserConsent(userId: string, consentType: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${userId}/consents?consentType=${consentType}`, {});
  }

  /**
   * Révoquer un consentement pour un utilisateur
   * DELETE /api/users/{userId}/consents/{consentType}
   */
  revokeUserConsent(userId: string, consentType: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${userId}/consents/${consentType}`);
  }

  // ===== Admin Consent Types Management =====

  /**
   * Récupérer tous les types de consentement
   * GET /api/users/admin/consent-types
   */
  getAllConsentTypes(): Observable<ConsentTypeDto[]> {
    return this.http.get<ConsentTypeDto[]>(`${this.baseUrl}/admin/consent-types`);
  }

  /**
   * Créer un nouveau type de consentement
   * POST /api/users/admin/consent-types
   */
  createConsentType(request: ConsentTypeRequest): Observable<ConsentTypeDto> {
    return this.http.post<ConsentTypeDto>(`${this.baseUrl}/admin/consent-types`, request);
  }

  /**
   * Activer un type de consentement
   * PUT /api/users/admin/consent-types/{typeId}/activate
   */
  activateConsentType(typeId: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/admin/consent-types/${typeId}/activate`, {});
  }

  /**
   * Désactiver un type de consentement
   * PUT /api/users/admin/consent-types/{typeId}/deactivate
   */
  deactivateConsentType(typeId: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/admin/consent-types/${typeId}/deactivate`, {});
  }

  /**
   * Supprimer un type de consentement
   * DELETE /api/users/admin/consent-types/{typeId}
   */
  deleteConsentType(typeId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/admin/consent-types/${typeId}`);
  }
}
