import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { KycService } from '../../../core/services/kyc.service';
import { KycDocumentResponseDto } from '../../../core/models/KycDocumentResponseDto';
import { KycUploadDialogComponent } from './kyc-upload-dialog/kyc-upload-dialog.component';

@Component({
  selector: 'app-client-kyc',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './client-kyc.component.html',
  styleUrls: ['./client-kyc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientKycComponent implements OnInit {

  kycDocuments: (KycDocumentResponseDto & { clientId: string; clientName: string })[] = [];
  filteredDocuments: (KycDocumentResponseDto & { clientId: string; clientName: string })[] = [];
  isLoading = true;
  displayedColumns: string[] = ['documentType', 'status', 'uploadedAt', 'actions'];

  // Statistiques
  statistics = {
    total: 0,
    pending: 0,
    verified: 0,
    rejected: 0
  };

  // Types de documents disponibles
  documentTypes = [
    { value: 'CIN', label: 'Carte d\'Identité Nationale' },
    { value: 'Permis', label: 'Permis de Conduire' },
    { value: 'Passport', label: 'Passeport' },
    { value: 'Justificatif_de_domicile', label: 'Justificatif de Domicile' },
    { value: 'Autre', label: 'Autre' }
  ];

  // Utilisateur courant (à récupérer du contexte)
  currentUserId: string = 'client-123'; // À remplacer par l'utilisateur actuel
  currentClientName: string = 'Nom du Client'; // À remplacer

  constructor(
    private kycService: KycService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadKycDocuments();
  }

  /**
   * Charge les documents KYC du client courant
   */
  loadKycDocuments(): void {
    this.isLoading = true;
    this.cdr.markForCheck();

    this.kycService.getKycDocuments(this.currentUserId).subscribe({
      next: (documents: KycDocumentResponseDto[]) => {
        // Ajouter les infos du client à chaque document
        this.kycDocuments = documents.map(doc => ({
          ...doc,
          clientId: this.currentUserId,
          clientName: this.currentClientName
        }));

        this.filteredDocuments = [...this.kycDocuments];
        this.updateStatistics();
        this.isLoading = false;
        this.cdr.markForCheck();
        
        console.log('%c📄 Documents KYC chargés:', 'color: green;', this.kycDocuments);
      },
      error: (err: any) => {
        console.error('%c❌ Erreur lors du chargement des documents KYC:', 'color: red;', err);
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  /**
   * Mettre à jour les statistiques
   */
  updateStatistics(): void {
    this.statistics = {
      total: this.kycDocuments.length,
      pending: this.kycDocuments.filter(d => d.status === 'PENDING').length,
      verified: this.kycDocuments.filter(d => d.status === 'VERIFIED').length,
      rejected: this.kycDocuments.filter(d => d.status === 'REJECTED').length
    };
  }

  /**
   * Ouvre le formulaire d'upload
   */
  openUploadDialog(): void {
    const dialogRef = this.dialog.open(KycUploadDialogComponent, {
      width: '500px',
      data: {
        documentTypes: this.documentTypes
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.uploadKycDocument(result.documentType, result.file);
      }
    });
  }

  /**
   * Upload un document KYC
   */
  uploadKycDocument(documentType: string, file: File): void {
    console.log('%c📤 Upload du document KYC:', 'color: blue;', documentType, file.name);

    this.kycService.uploadKycDocument(this.currentUserId, documentType, file).subscribe({
      next: () => {
        console.log('%c✅ Document uploaddé avec succès!', 'color: green;');
        alert('✅ Document uploaddé avec succès!');
        // Recharger les documents
        this.loadKycDocuments();
      },
      error: (err: any) => {
        console.error('%c❌ Erreur lors de l\'upload:', 'color: red;', err);
        alert('❌ Erreur lors de l\'upload du document');
      }
    });
  }

  /**
   * Télécharge un document KYC
   */
  downloadKycDocument(doc: KycDocumentResponseDto & { clientId: string; clientName: string }): void {
    if (!doc.pathToDocument) {
      alert('❌ Aucun chemin de fichier disponible');
      return;
    }

    console.log('%c📥 Téléchargement du document:', 'color: blue;', doc.pathToDocument);
    
    this.kycService.downloadKycDocument(doc.pathToDocument).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${doc.documentType}_${doc.clientName}.pdf`;
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        link.remove();
        
        console.log('%c✅ Document téléchargé avec succès!', 'color: green;');
      },
      error: (err: any) => {
        console.error('%c❌ Erreur lors du téléchargement:', 'color: red;', err);
        alert('❌ Erreur lors du téléchargement du document');
      }
    });
  }

  /**
   * Visualise un document KYC
   */
  viewKycDocument(doc: KycDocumentResponseDto & { clientId: string; clientName: string }): void {
    if (!doc.pathToDocument) {
      alert('❌ Aucun chemin de fichier disponible');
      return;
    }

    console.log('%c👁️ Visualisation du document:', 'color: blue;', doc.pathToDocument);
    
    const viewUrl = this.kycService.viewKycDocument(doc.pathToDocument);
    window.open(viewUrl, '_blank', 'width=1000,height=800');
    
    console.log('%c✅ Document ouvert en visualisation', 'color: green;');
  }

  /**
   * Retourne le label du statut
   */
  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'PENDING': 'En Attente',
      'VERIFIED': 'Validé',
      'REJECTED': 'Rejeté'
    };
    return labels[status] || status;
  }

  /**
   * Retourne la couleur du statut
   */
  getStatusColor(status: string): 'primary' | 'accent' | 'warn' {
    const colors: { [key: string]: 'primary' | 'accent' | 'warn' } = {
      'PENDING': 'primary',
      'VERIFIED': 'accent',
      'REJECTED': 'warn'
    };
    return colors[status] || 'primary';
  }

  /**
   * Retourne le label du type de document
   */
  getDocumentTypeLabel(type: string): string {
    const doc = this.documentTypes.find(d => d.value === type);
    return doc ? doc.label : type;
  }

  /**
   * Format la date
   */
  formatDate(date: any): string {
    if (!date) return '-';
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
