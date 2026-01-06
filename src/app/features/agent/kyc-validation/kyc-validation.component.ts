import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AgentMockDataService } from '../../../core/services/agent-mock-data.service';
import { KycService } from '../../../core/services/kyc.service';
import { ClientDto } from '../../../core/models/ClientDto';
import { KycDocumentResponseDto } from '../../../core/models/KycDocumentResponseDto';

/**
 * KycValidationComponent
 * 
 * Interface pour valider les documents KYC des clients
 * Permet de:
 * - Voir tous les documents en attente de validation
 * - Filtrer par statut, client, type de document
 * - Valider ou rejeter les documents
 */
@Component({
  selector: 'app-kyc-validation',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    FormsModule
  ],
  templateUrl: './kyc-validation.component.html',
  styleUrls: ['./kyc-validation.component.scss']
})
export class KycValidationComponent implements OnInit {

  /**
   * Liste de tous les documents KYC à valider
   */
  allDocuments: (KycDocumentResponseDto & { clientId: string; clientName: string })[] = [];

  /**
   * Documents filtrés selon les critères de recherche
   */
  filteredDocuments: (KycDocumentResponseDto & { clientId: string; clientName: string })[] = [];

  /**
   * Colonnes affichées dans le tableau
   */
  displayedColumns: string[] = [
    'clientName',
    'documentType',
    'status',
    'uploadedAt',
    'actions'
  ];

  /**
   * Critères de filtrage
   */
  filterCriteria = {
    status: 'PENDING',  // Affiche par défaut les documents en attente
    documentType: '',
    clientName: ''
  };

  /**
   * Statistiques des validations
   */
  statistics = {
    total: 0,
    pending: 0,
    validated: 0,
    rejected: 0
  };

  /**
   * Flag pour afficher un spinner de chargement
   */
  isLoading = false;

  constructor(
    private mockDataService: AgentMockDataService,
    private kycService: KycService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log('%c✅ KycValidationComponent initialisé', 'color: green; font-weight: bold;');
    this.loadAllDocuments();
  }

  /**
   * Charger tous les documents KYC depuis le service
   */
  loadAllDocuments(): void {
    this.isLoading = true;
    console.log('%c📄 Chargement des documents KYC...', 'color: blue;');

    // Récupérer tous les clients
    this.mockDataService.getAllClients().subscribe({
      next: (clients: ClientDto[]) => {
        this.allDocuments = [];

        // Pour chaque client, récupérer ses documents KYC
        clients.forEach(client => {
          this.mockDataService.getClientKycDocuments(client.clientId).subscribe({
            next: (documents: KycDocumentResponseDto[]) => {
              // Ajouter les infos du client aux documents
              documents.forEach(doc => {
                this.allDocuments.push({
                  ...doc,
                  clientId: client.clientId,
                  clientName: `${client.firstName} ${client.lastName}`
                });
              });

              // Appliquer les filtres et mettre à jour les statistiques
              this.applyFilters();
              this.calculateStatistics();
              this.isLoading = false;

              console.log('%c✅ Documents KYC chargés:', 'color: green;', this.allDocuments);
            },
            error: (error) => {
              console.error('%c❌ Erreur lors du chargement des documents:', 'color: red;', error);
              this.isLoading = false;
            }
          });
        });
      },
      error: (error) => {
        console.error('%c❌ Erreur lors du chargement des clients:', 'color: red;', error);
        this.isLoading = false;
      }
    });
  }

  /**
   * Appliquer les filtres sur les documents
   */
  applyFilters(): void {
    this.filteredDocuments = this.allDocuments.filter(doc => {
      const matchStatus = this.filterCriteria.status === '' || doc.status === this.filterCriteria.status;
      const matchType = this.filterCriteria.documentType === '' || doc.documentType === this.filterCriteria.documentType;
      const matchName = doc.clientName.toLowerCase().includes(this.filterCriteria.clientName.toLowerCase());

      return matchStatus && matchType && matchName;
    });

    console.log('%c🔍 Filtres appliqués:', 'color: purple;', {
      total: this.allDocuments.length,
      filtered: this.filteredDocuments.length,
      criteria: this.filterCriteria
    });
  }

  /**
   * Calculer les statistiques des documents
   */
  calculateStatistics(): void {
    this.statistics.total = this.allDocuments.length;
    this.statistics.pending = this.allDocuments.filter(d => d.status === 'PENDING').length;
    this.statistics.validated = this.allDocuments.filter(d => d.status === 'VERIFIED').length;
    this.statistics.rejected = this.allDocuments.filter(d => d.status === 'REJECTED').length;

    console.log('%c📊 Statistiques:', 'color: blue;', this.statistics);
  }

  /**
   * Valider un document KYC
   * 
   * @param document Le document à valider
   */
  validateDocument(document: any): void {
    const comment = prompt('Commentaire de validation:', 'Document approuvé');
    
    if (comment === null) return; // Annuler

    console.log('%c✅ Validation du document:', 'color: green;', {
      clientId: document.clientId,
      documentId: document.id,
      comment
    });

    this.mockDataService.validateKycDocument(
      document.clientId,
      document.id,
      comment || 'Approuvé'
    ).subscribe({
      next: (result) => {
        alert('✅ Document validé avec succès!');
        this.loadAllDocuments();
      },
      error: (error) => {
        console.error('%c❌ Erreur lors de la validation:', 'color: red;', error);
        alert('❌ Erreur lors de la validation');
      }
    });
  }

  /**
   * Rejeter un document KYC
   * 
   * @param document Le document à rejeter
   */
  rejectDocument(document: any): void {
    const reason = prompt('Raison du rejet:', 'Document non conforme');
    
    if (reason === null) return; // Annuler

    console.log('%c❌ Rejet du document:', 'color: red;', {
      clientId: document.clientId,
      documentId: document.id,
      reason
    });

    this.mockDataService.rejectKycDocument(
      document.clientId,
      document.id,
      reason || 'Non conforme'
    ).subscribe({
      next: (result) => {
        alert('❌ Document rejeté!');
        this.loadAllDocuments();
      },
      error: (error) => {
        console.error('%c❌ Erreur lors du rejet:', 'color: red;', error);
        alert('❌ Erreur lors du rejet');
      }
    });
  }

  /**
   * Télécharger un document
   * 
   * @param document Le document à télécharger
   */
  downloadDocument(document: any): void {
    console.log('%c⬇️ Téléchargement du document:', 'color: blue;', document);
    // À implémenter: télécharger le document depuis le serveur
    alert('Téléchargement du document: ' + document.id);
  }

  /**
   * Obtenir la couleur du chip pour un statut
   * 
   * @param status Le statut du document
   * @returns Classe CSS de couleur
   */
  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'VERIFIED': 'accent',
      'PENDING': 'warn',
      'REJECTED': 'error'
    };
    return colors[status] || 'primary';
  }

  /**
   * Obtenir le label du statut en français
   * 
   * @param status Le statut du document
   * @returns Label en français
   */
  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'VERIFIED': 'Validé',
      'PENDING': 'En attente',
      'REJECTED': 'Rejeté'
    };
    return labels[status] || status;
  }

  /**
   * Obtenir le label du type de document en français
   * 
   * @param type Le type de document
   * @returns Label en français
   */
  getDocumentTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'ID_CARD': 'Carte d\'identité',
      'PASSPORT': 'Passeport',
      'PROOF_OF_ADDRESS': 'Justificatif d\'adresse',
      'BANK_STATEMENT': 'Relevé bancaire',
      'INCOME_PROOF': 'Justificatif de revenu'
    };
    return labels[type] || type;
  }

  /**
   * Formater une date
   * 
   * @param date La date à formater
   * @returns Date formatée
   */
  formatDate(date: Date | null): string {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Réinitialiser les filtres
   */
  resetFilters(): void {
    this.filterCriteria = {
      status: 'PENDING',
      documentType: '',
      clientName: ''
    };
    this.applyFilters();
    console.log('%c🔄 Filtres réinitialisés', 'color: blue;');
  }

  /**
   * Télécharge un document KYC
   * @param document Le document à télécharger
   */
  downloadKycDocument(doc: KycDocumentResponseDto & { clientId: string; clientName: string }): void {
    if (!doc.pathToDocument) {
      alert('❌ Aucun chemin de fichier disponible');
      return;
    }

    console.log('%c📥 Téléchargement du document:', 'color: blue;', doc.pathToDocument);
    
    this.kycService.downloadKycDocument(doc.pathToDocument).subscribe({
      next: (blob: Blob) => {
        // Créer un lien de téléchargement
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${doc.documentType}_${doc.clientName}.pdf`;
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        link.remove();
        
        console.log('%c✅ Document téléchargé avec succès!', 'color: green;');
        alert('✅ Document téléchargé avec succès!');
      },
      error: (err: any) => {
        console.error('%c❌ Erreur lors du téléchargement:', 'color: red;', err);
        alert('❌ Erreur lors du téléchargement du document');
      }
    });
  }

  /**
   * Visualise un document KYC dans une nouvelle fenêtre
   * @param document Le document à visualiser
   */
  viewKycDocument(doc: KycDocumentResponseDto & { clientId: string; clientName: string }): void {
    if (!doc.pathToDocument) {
      alert('❌ Aucun chemin de fichier disponible');
      return;
    }

    console.log('%c👁️ Visualisation du document:', 'color: blue;', doc.pathToDocument);
    
    // Obtenir l'URL de visualisation du service
    const viewUrl = this.kycService.viewKycDocument(doc.pathToDocument);
    
    // Ouvrir dans une nouvelle fenêtre
    window.open(viewUrl, '_blank', 'width=1000,height=800');
    
    console.log('%c✅ Document ouvert en visualisation', 'color: green;');
  }
}
