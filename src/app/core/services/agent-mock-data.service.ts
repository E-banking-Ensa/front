import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ClientDto } from '../models/ClientDto';
import { AccountDTO } from '../models/AccountDTO';
import { KycDocumentResponseDto } from '../models/KycDocumentResponseDto';

/**
 * Service Mock pour l'agent
 * Fournit des données mockées pour développement
 * Sera remplacé par des appels HTTP au backend
 */
@Injectable({
  providedIn: 'root'
})
export class AgentMockDataService {
  // ====== DONNÉES MOCKÉES CLIENTS ======
  private mockClients: ClientDto[] = [
    {
      clientId: 'CL001',
      username: 'john.doe',
      email: 'john.doe@bank.com',
      phoneNumber: '+212612345678',
      adresse: '123 Rue Principal, Casablanca',
      firstName: 'John',
      lastName: 'Doe',
      kycStatus: 'VERIFIED',
      createdAt: new Date('2024-01-15'),
      status: 'ACTIVE',
      accounts: []
    },
    {
      clientId: 'CL002',
      username: 'jane.smith',
      email: 'jane.smith@bank.com',
      phoneNumber: '+212687654321',
      adresse: '456 Avenue Commerce, Fès',
      firstName: 'Jane',
      lastName: 'Smith',
      kycStatus: 'PENDING',
      createdAt: new Date('2024-02-10'),
      status: 'ACTIVE',
      accounts: []
    },
    {
      clientId: 'CL003',
      username: 'ali.moroccan',
      email: 'ali.moroccan@bank.com',
      phoneNumber: '+212611112222',
      adresse: '789 Boulevard Central, Marrakech',
      firstName: 'Ali',
      lastName: 'Moroccan',
      kycStatus: 'VERIFIED',
      createdAt: new Date('2023-12-05'),
      status: 'INACTIVE',
      accounts: []
    }
  ];

  // ====== DONNÉES MOCKÉES COMPTES ======
  private mockAccounts: Map<string, AccountDTO[]> = new Map([
    [
      'CL001',
      [
        {
          accountId: 1,
          clientId: 'CL001',
          rib: '23078071537634',
          accountType: 'SAVINGS' as any,
          accountStatus: 'ACTIVE' as any,
          balance: 15000.50,
          currency: 'DH',
          createdDate: '2024-01-15T00:00:00',
          transactions: []
        },
        {
          accountId: 2,
          clientId: 'CL001',
          rib: '23078071537635',
          accountType: 'CURRENT' as any,
          accountStatus: 'ACTIVE' as any,
          balance: 5400.75,
          currency: 'DH',
          createdDate: '2024-01-16T00:00:00',
          transactions: []
        }
      ]
    ],
    [
      'CL002',
      [
        {
          accountId: 3,
          clientId: 'CL002',
          rib: '23078071537636',
          accountType: 'CURRENT' as any,
          accountStatus: 'PENDING' as any,
          balance: 2000.00,
          currency: 'DH',
          createdDate: '2024-02-10T00:00:00',
          transactions: []
        }
      ]
    ]
  ]);

  // ====== DONNÉES MOCKÉES DOCUMENTS KYC ======
  private mockKycDocuments: Map<string, KycDocumentResponseDto[]> = new Map([
    [
      'CL001',
      [
        {
          id: 'KYC001',
          documentType: 'ID_CARD',
          status: 'VERIFIED',
          pathToDocument: '/documents/kyc/CL001/id_card.pdf',
          uploadedAt: new Date('2024-01-16'),
          reviewedAt: new Date('2024-01-20') as any,
          reviewComment: 'Document valide et clair'
        },
        {
          id: 'KYC002',
          documentType: 'PROOF_OF_ADDRESS',
          status: 'VERIFIED',
          pathToDocument: '/documents/kyc/CL001/address_proof.pdf',
          uploadedAt: new Date('2024-01-17'),
          reviewedAt: new Date('2024-01-21') as any,
          reviewComment: 'Accepté'
        }
      ]
    ],
    [
      'CL002',
      [
        {
          id: 'KYC003',
          documentType: 'ID_CARD',
          status: 'PENDING',
          pathToDocument: '/documents/kyc/CL002/id_card.pdf',
          uploadedAt: new Date('2024-02-11'),
          reviewedAt: new Date() as any,
          reviewComment: 'En attente de revue'
        }
      ]
    ]
  ]);

  // ====== DONNÉES MOCKÉES CONSENTIS ======
  private mockConsents: Map<string, any[]> = new Map([
    [
      'CL001',
      [
        {
          id: 'CONSENT001',
          clientId: 'CL001',
          type: 'DATA_SHARING',
          status: 'ACCEPTED',
          createdAt: new Date('2024-01-16'),
          expiresAt: new Date('2025-01-16')
        },
        {
          id: 'CONSENT002',
          clientId: 'CL001',
          type: 'MARKETING',
          status: 'REJECTED',
          createdAt: new Date('2024-01-20'),
          expiresAt: new Date('2025-01-20')
        }
      ]
    ],
    [
      'CL002',
      [
        {
          id: 'CONSENT003',
          clientId: 'CL002',
          type: 'DATA_SHARING',
          status: 'PENDING',
          createdAt: new Date('2024-02-12'),
          expiresAt: new Date('2025-02-12')
        }
      ]
    ]
  ]);

  constructor() {}

  /**
   * Récupère tous les clients
   * Délai minimal pour développement
   */
  getAllClients(): Observable<ClientDto[]> {
    return of(this.mockClients).pipe(delay(100));
  }

  /**
   * Récupère un client par son ID
   */
  getClientById(clientId: string): Observable<ClientDto | undefined> {
    const client = this.mockClients.find(c => c.clientId === clientId);
    return of(client).pipe(delay(50));
  }

  /**
   * Récupère les comptes d'un client
   */
  getClientAccounts(clientId: string): Observable<AccountDTO[]> {
    const accounts = this.mockAccounts.get(clientId) || [];
    return of(accounts).pipe(delay(50));
  }

  /**
   * Récupère les documents KYC d'un client
   */
  getClientKycDocuments(clientId: string): Observable<KycDocumentResponseDto[]> {
    const documents = this.mockKycDocuments.get(clientId) || [];
    return of(documents).pipe(delay(50));
  }

  /**
   * Récupère les consentis d'un client
   */
  getClientConsents(clientId: string): Observable<any[]> {
    const consents = this.mockConsents.get(clientId) || [];
    return of(consents).pipe(delay(50));
  }

  /**
   * Valide un document KYC
   */
  validateKycDocument(
    clientId: string,
    documentId: string,
    comment: string
  ): Observable<any> {
    console.log(
      `Validation KYC - Client: ${clientId}, Doc: ${documentId}, Comment: ${comment}`
    );
    // Simuler la validation
    return of({ success: true, message: 'Document validé avec succès' }).pipe(
      delay(100)
    );
  }

  /**
   * Rejette un document KYC
   */
  rejectKycDocument(
    clientId: string,
    documentId: string,
    reason: string
  ): Observable<any> {
    console.log(
      `Rejet KYC - Client: ${clientId}, Doc: ${documentId}, Raison: ${reason}`
    );
    // Simuler le rejet
    return of({ success: true, message: 'Document rejeté' }).pipe(delay(100));
  }

  /**
   * Accepte un consentement
   */
  acceptConsent(clientId: string, consentId: string): Observable<any> {
    console.log(`Acceptation consentement - Client: ${clientId}, Consent: ${consentId}`);
    return of({ success: true, message: 'Consentement accepté' }).pipe(delay(100));
  }

  /**
   * Recherche des clients par terme
   */
  searchClients(searchTerm: string): Observable<ClientDto[]> {
    if (!searchTerm || searchTerm.trim() === '') {
      return of(this.mockClients).pipe(delay(100));
    }
    const term = searchTerm.toLowerCase();
    const filtered = this.mockClients.filter(
      c =>
        c.firstName.toLowerCase().includes(term) ||
        c.lastName.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term) ||
        c.username.toLowerCase().includes(term)
    );
    return of(filtered).pipe(delay(100));
  }
}
