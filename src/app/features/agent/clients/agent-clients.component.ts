import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

import { ClientDto } from '../../../core/models/ClientDto';
import { AgentMockDataService } from '../../../core/services/agent-mock-data.service';
import { ClientDetailsDialogComponent } from './client-details-dialog/client-details-dialog.component';

/**
 * Composant pour afficher et gérer la liste des clients assignés à l'agent
 * - Liste de tous les clients
 * - Recherche par terme
 * - Actions: voir détails, voir comptes, voir KYC, voir consentis
 */
@Component({
  selector: 'app-agent-clients',
  standalone: true,
  templateUrl: './agent-clients.component.html',
  styleUrls: ['./agent-clients.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatTabsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    RouterModule
  ]
})
export class AgentClientsComponent implements OnInit {
  // ====== VARIABLES ======
  /** Liste complète des clients */
  clients: ClientDto[] = [];

  /** Clients filtrés par recherche */
  filteredClients: ClientDto[] = [];

  /** Terme de recherche */
  searchTerm: string = '';

  /** Colonnes affichées dans la table */
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'phoneNumber',
    'kycStatus',
    'status',
    'createdAt',
    'actions'
  ];

  /** Statistiques */
  totalClients: number = 0;
  pendingKyc: number = 0;
  verifiedKyc: number = 0;

  /** État de chargement */
  isLoading: boolean = true;

  constructor(
    private mockDataService: AgentMockDataService,
    private dialog: MatDialog
  ) {}

  /**
   * Initialise le composant
   * - Charge la liste des clients
   * - Calcule les statistiques
   */
  ngOnInit(): void {
    this.loadClients();
  }

  /**
   * Charge la liste des clients depuis le service
   */
  loadClients(): void {
    this.isLoading = true;
    this.mockDataService.getAllClients().subscribe({
      next: (data: ClientDto[]) => {
        this.clients = data;
        this.filteredClients = data;
        this.calculateStatistics();
        this.isLoading = false;
        console.log('✅ Clients chargés:', data);
      },
      error: (err: any) => {
        console.error('❌ Erreur chargement clients:', err);
        this.isLoading = false;
      }
    });
  }

  /**
   * Filtre les clients selon le terme de recherche
   */
  filterClients(): void {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.filteredClients = this.clients;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredClients = this.clients.filter(client =>
      client.firstName.toLowerCase().includes(term) ||
      client.lastName.toLowerCase().includes(term) ||
      client.email.toLowerCase().includes(term) ||
      client.phoneNumber.includes(term) ||
      client.clientId.toLowerCase().includes(term)
    );

    console.log(`🔍 Recherche: "${this.searchTerm}" - ${this.filteredClients.length} résultats`);
  }

  /**
   * Calcule les statistiques des clients
   */
  private calculateStatistics(): void {
    this.totalClients = this.clients.length;
    this.pendingKyc = this.clients.filter(c => c.kycStatus === 'PENDING').length;
    this.verifiedKyc = this.clients.filter(c => c.kycStatus === 'VERIFIED').length;
  }

  /**
   * Affiche les détails du client dans une boîte de dialogue
   */
  viewClientDetails(client: ClientDto): void {
    console.log('👁️ Affichage détails:', client);
    this.dialog.open(ClientDetailsDialogComponent, {
      width: '900px',
      data: { clientId: client.clientId }
    });
  }

  /**
   * Affiche les comptes du client dans une boîte de dialogue
   */
  viewClientAccounts(client: ClientDto): void {
    console.log('💰 Affichage comptes:', client);
    this.mockDataService.getClientAccounts(client.clientId).subscribe({
      next: (accounts: any[]) => {
        this.dialog.open(ClientDetailsDialogComponent, {
          width: '900px',
          data: { clientId: client.clientId, tab: 'accounts' }
        });
      },
      error: (err: any) => console.error('❌ Erreur comptes:', err)
    });
  }

  /**
   * Affiche les documents KYC du client
   */
  viewClientKyc(client: ClientDto): void {
    console.log('📄 Affichage KYC:', client);
    this.mockDataService.getClientKycDocuments(client.clientId).subscribe({
      next: (documents: any[]) => {
        this.dialog.open(ClientDetailsDialogComponent, {
          width: '900px',
          data: { clientId: client.clientId, tab: 'kyc' }
        });
      },
      error: (err: any) => console.error('❌ Erreur KYC:', err)
    });
  }

  /**
   * Affiche les consentis du client
   */
  viewClientConsents(client: ClientDto): void {
    console.log('📋 Affichage consentis:', client);
    this.mockDataService.getClientConsents(client.clientId).subscribe({
      next: (consents: any[]) => {
        this.dialog.open(ClientDetailsDialogComponent, {
          width: '900px',
          data: { clientId: client.clientId, tab: 'consents' }
        });
      },
      error: (err: any) => console.error('❌ Erreur consentis:', err)
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
   * Détermine la couleur du statut du client
   */
  getStatusColor(status: string): string {
    return status === 'ACTIVE' ? 'accent' : 'warn';
  }
}
