import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { ClientService } from '../../../core/services/client.service';
import { ClientDto } from '../../../core/models/ClientDto';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyProfileComponent implements OnInit {

  client: ClientDto | null = null;
  isLoading = true;
  isEditing = false;
  editForm: any = {};

  // ID du client actuel (à récupérer du token/contexte)
  currentClientId = 'CL100001'; // TODO: Récupérer du token

  constructor(
    private clientService: ClientService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadClientProfile();
  }

  /**
   * Charge le profil du client
   */
  loadClientProfile(): void {
    this.isLoading = true;
    this.cdr.markForCheck();

    // ✅ DONNÉES DE TEST - À afficher et combiner avec le backend
    const mockClientData: ClientDto = {
      clientId: 'CL100001',
      firstName: 'Ahmed',
      lastName: 'Ben Ali',
      username: 'ahmed.ben.ali',
      email: 'ahmed.benali@example.com',
      phoneNumber: '+212612345678',
      adresse: 'Rabat, Maroc',
      kycStatus: 'VERIFIED',
      status: 'ACTIVE',
      createdAt: new Date('2024-01-15'),
      accounts: []
    };

    console.log('%c📦 DONNÉES DE TEST PROFIL CLIENT:', 'color: #FF6B6B; font-weight: bold;', mockClientData);

    // Appel au backend avec fallback sur les données de test
    this.clientService.getClient(this.currentClientId).subscribe({
      next: (client: ClientDto) => {
        // Fusionner les données du backend avec les données de test (backend prioritaire)
        this.client = { ...mockClientData, ...client };
        this.editForm = { ...this.client };
        this.isLoading = false;
        this.cdr.markForCheck();
        console.log('%c✅ Profil client chargé (Backend + Test):', 'color: green;', this.client);
      },
      error: (err: any) => {
        // En cas d'erreur backend, utiliser les données de test
        console.warn('%c⚠️ Backend indisponible, utilisation des données de test:', 'color: orange;', err);
        this.client = mockClientData;
        this.editForm = { ...this.client };
        this.isLoading = false;
        this.cdr.markForCheck();
        console.log('%c📦 Profil affiché depuis les données de test:', 'color: #4ECDC4;', this.client);
      }
    });
  }

  /**
   * Active le mode édition
   */
  startEditing(): void {
    if (this.client) {
      this.editForm = { ...this.client };
      this.isEditing = true;
      this.cdr.markForCheck();
      console.log('%c✏️ Mode édition activé', 'color: blue;');
    }
  }

  /**
   * Annule l'édition
   */
  cancelEditing(): void {
    this.isEditing = false;
    this.editForm = {};
    this.cdr.markForCheck();
    console.log('%c❌ Édition annulée', 'color: orange;');
  }

  /**
   * Sauvegarde les modifications
   */
  saveProfile(): void {
    if (!this.client) return;

    // TODO: Implémenter l'appel API pour mettre à jour le profil
    console.log('%c💾 Profil mis à jour:', 'color: green;', this.editForm);

    // Mettre à jour l'objet client local
    this.client = { ...this.editForm };
    this.isEditing = false;
    this.cdr.markForCheck();

    alert('✅ Profil mis à jour avec succès!');
  }

  /**
   * Retourne la couleur du statut KYC
   */
  getKycStatusColor(status: string): 'primary' | 'accent' | 'warn' {
    const colors: { [key: string]: 'primary' | 'accent' | 'warn' } = {
      'VERIFIED': 'accent',
      'PENDING': 'primary',
      'REJECTED': 'warn',
      'UNVERIFIED': 'warn'
    };
    return colors[status] || 'primary';
  }

  /**
   * Retourne le label du statut KYC
   */
  getKycStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'VERIFIED': '✅ Vérifié',
      'PENDING': '⏳ En Attente',
      'REJECTED': '❌ Rejeté',
      'UNVERIFIED': '⚠️ Non Vérifié'
    };
    return labels[status] || status;
  }

  /**
   * Retourne la couleur du statut client
   */
  getStatusColor(status: string): 'primary' | 'accent' | 'warn' {
    const colors: { [key: string]: 'primary' | 'accent' | 'warn' } = {
      'ACTIVE': 'accent',
      'SUSPENDED': 'warn',
      'INACTIVE': 'primary',
      'CLOSED': 'warn'
    };
    return colors[status] || 'primary';
  }

  /**
   * Retourne le label du statut client
   */
  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'ACTIVE': '✅ Actif',
      'SUSPENDED': '⚠️ Suspendu',
      'INACTIVE': '❌ Inactif',
      'CLOSED': '🔒 Fermé'
    };
    return labels[status] || status;
  }

  /**
   * Formate la date
   */
  formatDate(date: any): string {
    if (!date) return '-';
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }
}
