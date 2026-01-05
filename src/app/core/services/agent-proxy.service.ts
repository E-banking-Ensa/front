import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientDto } from '../models/ClientDto';
import { AgentMockDataService } from './agent-mock-data.service';

/**
 * Service Proxy Agent
 * Gère la transition entre données mockées et appels backend
 *
 * USAGE:
 * - En développement: utilise AgentMockDataService
 * - En production: utilise des appels HTTP au backend
 *
 * Pour basculer vers le backend réel:
 * 1. Décommenter les appels HTTP
 * 2. Commenter les appels mock
 * 3. S'assurer que le backend est en cours d'exécution
 */
@Injectable({
  providedIn: 'root'
})
export class AgentProxyService {
  private baseUrl = 'http://localhost:8080/api/v1/agents';

  // ====== MODE DÉVELOPPEMENT ======
  // Laisser à true pour les données mockées, false pour le backend réel
  private useMockData = true;

  constructor(
    private http: HttpClient,
    private mockDataService: AgentMockDataService
  ) {}

  /**
   * Récupère tous les clients assignés à l'agent
   * - Mock: retourne les données mockées
   * - Backend: appel HTTP GET /api/v1/agents/{agentId}/clients
   */
  getAllClients(agentId?: string): Observable<ClientDto[]> {
    if (this.useMockData) {
      return this.mockDataService.getAllClients();
    }
    // Appel backend (décommenter quand prêt)
    // return this.http.get<ClientDto[]>(`${this.baseUrl}/${agentId}/clients`);
    return this.mockDataService.getAllClients();
  }

  /**
   * Récupère un client par son ID
   */
  getClientById(clientId: string): Observable<ClientDto | undefined> {
    if (this.useMockData) {
      return this.mockDataService.getClientById(clientId);
    }
    // Appel backend (décommenter quand prêt)
    // return this.http.get<ClientDto>(`${this.baseUrl}/clients/${clientId}`);
    return this.mockDataService.getClientById(clientId);
  }

  /**
   * Récupère les comptes d'un client
   */
  getClientAccounts(clientId: string): Observable<any[]> {
    if (this.useMockData) {
      return this.mockDataService.getClientAccounts(clientId);
    }
    // Appel backend (décommenter quand prêt)
    // return this.http.get<any[]>(`${this.baseUrl}/clients/${clientId}/accounts`);
    return this.mockDataService.getClientAccounts(clientId);
  }

  /**
   * Récupère les documents KYC d'un client
   */
  getClientKycDocuments(clientId: string): Observable<any[]> {
    if (this.useMockData) {
      return this.mockDataService.getClientKycDocuments(clientId);
    }
    // Appel backend (décommenter quand prêt)
    // return this.http.get<any[]>(`${this.baseUrl}/clients/${clientId}/kyc-documents`);
    return this.mockDataService.getClientKycDocuments(clientId);
  }

  /**
   * Récupère les consentements d'un client
   */
  getClientConsents(clientId: string): Observable<any[]> {
    if (this.useMockData) {
      return this.mockDataService.getClientConsents(clientId);
    }
    // Appel backend (décommenter quand prêt)
    // return this.http.get<any[]>(`${this.baseUrl}/clients/${clientId}/consents`);
    return this.mockDataService.getClientConsents(clientId);
  }

  /**
   * Valide un document KYC
   */
  validateKycDocument(
    clientId: string,
    documentId: string,
    comment: string
  ): Observable<any> {
    if (this.useMockData) {
      return this.mockDataService.validateKycDocument(clientId, documentId, comment);
    }
    // Appel backend (décommenter quand prêt)
    // return this.http.post(`${this.baseUrl}/kyc/${documentId}/validate`, { comment });
    return this.mockDataService.validateKycDocument(clientId, documentId, comment);
  }

  /**
   * Rejette un document KYC
   */
  rejectKycDocument(clientId: string, documentId: string, reason: string): Observable<any> {
    if (this.useMockData) {
      return this.mockDataService.rejectKycDocument(clientId, documentId, reason);
    }
    // Appel backend (décommenter quand prêt)
    // return this.http.post(`${this.baseUrl}/kyc/${documentId}/reject`, { reason });
    return this.mockDataService.rejectKycDocument(clientId, documentId, reason);
  }

  /**
   * Accepte un consentement
   */
  acceptConsent(clientId: string, consentId: string): Observable<any> {
    if (this.useMockData) {
      return this.mockDataService.acceptConsent(clientId, consentId);
    }
    // Appel backend (décommenter quand prêt)
    // return this.http.post(`${this.baseUrl}/consents/${consentId}/accept`, {});
    return this.mockDataService.acceptConsent(clientId, consentId);
  }

  /**
   * Recherche des clients par terme
   */
  searchClients(searchTerm: string): Observable<ClientDto[]> {
    if (this.useMockData) {
      return this.mockDataService.searchClients(searchTerm);
    }
    // Appel backend (décommenter quand prêt)
    // return this.http.get<ClientDto[]>(`${this.baseUrl}/clients/search`, {
    //   params: { q: searchTerm }
    // });
    return this.mockDataService.searchClients(searchTerm);
  }

  /**
   * Active le mode mock data (pour développement)
   */
  enableMockMode(): void {
    this.useMockData = true;
    console.log('🟢 Mode MOCK activé');
  }

  /**
   * Désactive le mode mock data (utiliser le backend réel)
   */
  disableMockMode(): void {
    this.useMockData = false;
    console.log('🔴 Mode BACKEND activé - Assurez-vous que le serveur est en cours d\'exécution');
  }

  /**
   * Retourne l'état actuel du mode
   */
  isMockModeEnabled(): boolean {
    return this.useMockData;
  }
}
