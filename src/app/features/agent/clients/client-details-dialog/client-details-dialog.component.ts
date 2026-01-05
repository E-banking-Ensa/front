import { Component, Inject, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { forkJoin } from 'rxjs';

import { ClientDto } from '../../../../core/models/ClientDto';
import { AgentMockDataService } from '../../../../core/services/agent-mock-data.service';

/**
 * Composant de dialogue pour afficher les détails complets d'un client
 * - Onglet: Informations personnelles
 * - Onglet: Comptes bancaires
 * - Onglet: Documents KYC
 * - Onglet: Consentements
 */
@Component({
  selector: 'app-client-details-dialog',
  standalone: true,
  templateUrl: './client-details-dialog.component.html',
  styleUrls: ['./client-details-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatListModule,
    MatDividerModule,
    MatTableModule,
    MatProgressSpinnerModule
  ]
})
export class ClientDetailsDialogComponent implements OnInit {
  // ====== VARIABLES ======
  /** Client actuellement affiché */
  client: ClientDto | null = null;

  /** Onglet actif (par défaut: info) */
  selectedTabIndex: number = 0;

  /** Comptes du client */
  accounts: any[] = [];

  /** Documents KYC du client */
  kycDocuments: any[] = [];

  /** Consentements du client */
  consents: any[] = [];

  /** Colonnes pour la table des comptes */
  accountsColumns: string[] = [
    'accountId',
    'rib',
    'accountType',
    'accountStatus',
    'balance',
    'actions'
  ];

  /** Colonnes pour la table des documents KYC */
  kycColumns: string[] = ['documentType', 'status', 'uploadedAt', 'reviewComment', 'actions'];

  /** Colonnes pour la table des consentements */
  consentsColumns: string[] = ['type', 'status', 'createdAt', 'expiresAt'];

  /** État de chargement */
  isLoading: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mockDataService: AgentMockDataService,
    public dialogRef: MatDialogRef<ClientDetailsDialogComponent>,
    private cdr: ChangeDetectorRef
  ) {
    // Initialiser l'onglet sélectionné depuis les données
    if (data.tab === 'accounts') this.selectedTabIndex = 1;
    else if (data.tab === 'kyc') this.selectedTabIndex = 2;
    else if (data.tab === 'consents') this.selectedTabIndex = 3;
  }

  /**
   * Initialise le composant
   * - Charge les données du client
   * - Charge les comptes, documents KYC et consentements
   */
  ngOnInit(): void {
    this.loadClientData();
  }

  /**
   * Charge toutes les données du client
   */
  private loadClientData(): void {
    const clientId = this.data.clientId;

    // Utiliser forkJoin pour attendre tous les appels
    forkJoin({
      client: this.mockDataService.getClientById(clientId),
      accounts: this.mockDataService.getClientAccounts(clientId),
      documents: this.mockDataService.getClientKycDocuments(clientId),
      consents: this.mockDataService.getClientConsents(clientId)
    }).subscribe({
      next: (result: any) => {
        // Assigner tous les résultats
        this.client = result.client || null;
        this.accounts = result.accounts || [];
        this.kycDocuments = result.documents || [];
        this.consents = result.consents || [];
        
        // Arrêter le chargement
        this.isLoading = false;

        // Notifier Angular des changements
        this.cdr.markForCheck();

        // Logs
        console.log('✅ Client chargé:', this.client);
        console.log('✅ Comptes chargés:', this.accounts);
        console.log('✅ Documents KYC chargés:', this.kycDocuments);
        console.log('✅ Consentements chargés:', this.consents);
      },
      error: (err: any) => {
        console.error('❌ Erreur chargement données client:', err);
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  /**
   * Valide un document KYC
   */
  validateKycDocument(documentId: string): void {
    if (!this.client) return;

    const comment = `Validé le ${new Date().toLocaleDateString()}`;
    this.mockDataService
      .validateKycDocument(this.client.clientId, documentId, comment)
      .subscribe({
        next: (result: any) => {
          console.log('✅ Document validé:', result);
          alert('Document validé avec succès!');
          // Recharger les documents
          this.mockDataService.getClientKycDocuments(this.client!.clientId).subscribe({
            next: (documents: any[]) => {
              this.kycDocuments = documents;
            }
          });
        },
        error: (err: any) => console.error('❌ Erreur validation:', err)
      });
  }

  /**
   * Rejette un document KYC
   */
  rejectKycDocument(documentId: string): void {
    if (!this.client) return;

    const reason = prompt('Raison du rejet:');
    if (!reason) return;

    this.mockDataService.rejectKycDocument(this.client.clientId, documentId, reason).subscribe({
      next: (result: any) => {
        console.log('✅ Document rejeté:', result);
        alert('Document rejeté!');
        // Recharger les documents
        this.mockDataService.getClientKycDocuments(this.client!.clientId).subscribe({
          next: (documents: any[]) => {
            this.kycDocuments = documents;
          }
        });
      },
      error: (err: any) => console.error('❌ Erreur rejet:', err)
    });
  }

  /**
   * Accepte un consentement
   */
  acceptConsent(consentId: string): void {
    if (!this.client) return;

    this.mockDataService.acceptConsent(this.client.clientId, consentId).subscribe({
      next: (result: any) => {
        console.log('✅ Consentement accepté:', result);
        alert('Consentement accepté!');
      },
      error: (err: any) => console.error('❌ Erreur acceptation:', err)
    });
  }

  /**
   * Détermine la couleur du statut KYC
   */
  getKycStatusColor(status: string): string {
    switch (status) {
      case 'VERIFIED':
        return 'accent';
      case 'REJECTED':
        return 'warn';
      case 'PENDING':
        return 'primary';
      default:
        return '';
    }
  }

  /**
   * Détermine la couleur du statut du compte
   */
  getAccountStatusColor(status: string): string {
    return status === 'ACTIVE' ? 'accent' : status === 'PENDING' ? 'primary' : 'warn';
  }

  /**
   * Détermine la couleur du statut du consentement
   */
  getConsentStatusColor(status: string): string {
    switch (status) {
      case 'ACCEPTED':
        return 'accent';
      case 'REJECTED':
        return 'warn';
      case 'PENDING':
        return 'primary';
      default:
        return '';
    }
  }

  /**
   * Ferme le dialogue
   */
  closeDialog(): void {
    this.dialogRef.close();
  }
}
