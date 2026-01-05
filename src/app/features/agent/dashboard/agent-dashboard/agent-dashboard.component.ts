import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { DashbordAgent } from '../../../../core/models/DashbordAgent';

/**
 * AgentDashboardComponent
 * 
 * Tableau de bord principal pour les agents bancaires affichant:
 * - Statistiques clés (total clients, KYC pending, transactions)
 * - Graphiques et métriques
 * - Dernières activités
 * - Raccourcis vers les actions principales
 */
@Component({
  selector: 'app-agent-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatProgressBarModule,
    MatTableModule,
    MatChipsModule,
    MatButtonModule
  ],
  templateUrl: './agent-dashboard.component.html',
  styleUrls: ['./agent-dashboard.component.scss']
})
export class AgentDashboardComponent implements OnInit {

  /**
   * Données de l'agent depuis le service
   */
  agentData: DashbordAgent | null = null;
  loading = true;

  /**
   * Statistiques principales du dashboard
   * Mise à jour à partir des données de l'agent
   */
  statistics = {
    totalClients: 0,
    clientsPendingKyc: 0,
    activeTransactions: 0,
    verificationRate: 0
  };

  /**
   * Activités récentes de l'agent
   */
  recentActivities = [
    {
      id: 1,
      type: 'kyc_validation',
      title: 'Document KYC validé',
      description: 'Validation du document d\'identité de John Doe',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'completed'
    },
    {
      id: 2,
      type: 'client_registered',
      title: 'Nouveau client enregistré',
      description: 'Jane Smith s\'est inscrite avec succès',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      status: 'completed'
    },
    {
      id: 3,
      type: 'kyc_pending',
      title: 'KYC en attente',
      description: 'Ali Moroccan a soumis ses documents',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'pending'
    },
    {
      id: 4,
      type: 'consent_accepted',
      title: 'Consentement accepté',
      description: 'Consentement de partage de données accepté',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'completed'
    }
  ];

  /**
   * Tâches prioritaires pour l'agent
   */
  priorityTasks = [
    {
      id: 1,
      title: 'Valider 8 documents KYC',
      priority: 'high',
      progress: 25,
      description: '2 sur 8 validés'
    },
    {
      id: 2,
      title: 'Traiter les consentements',
      priority: 'medium',
      progress: 60,
      description: '3 sur 5 traités'
    },
    {
      id: 3,
      title: 'Vérifier les transactions',
      priority: 'low',
      progress: 90,
      description: '18 sur 20 vérifiées'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('%c✅ AgentDashboardComponent initialisé', 'color: green; font-weight: bold;');
    this.loadAgentDashboard();
  }

  /**
   * Charger les données du dashboard de l'agent
   */
  loadAgentDashboard(): void {
    // Mock données directement (dans un cas réel, cela viendrait du service)
    const mockAgentData: DashbordAgent = {
      clients: 125,
      clientsVerified: 92,
      clientsNonVerified: 18,
      clientsRefused: 15,
      consentes: 847,
      agentName: 'Ahmed Ben Ali',
      agentEmail: 'ahmed.benali@bank.com',
      createdAt: new Date().toISOString()
    };

    // Charger les données mock
    this.agentData = mockAgentData;
    this.updateStatistics();
    this.loading = false;
    console.log('%c📊 Données agent chargées:', 'color: blue;', this.agentData);
  }

  /**
   * Mettre à jour les statistiques basées sur les données de l'agent
   */
  updateStatistics(): void {
    if (this.agentData) {
      this.statistics = {
        totalClients: this.agentData.clients,
        clientsPendingKyc: this.agentData.clientsNonVerified,
        activeTransactions: this.agentData.consentes,
        verificationRate: Math.round((this.agentData.clientsVerified / this.agentData.clients) * 100) || 0
      };
    }
  }

  /**
   * Obtenir l'icône pour un type d'activité
   * 
   * @param type Le type d'activité
   * @returns Nom de l'icône Material
   */
  getActivityIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'kyc_validation': 'verified_user',
      'client_registered': 'person_add',
      'kyc_pending': 'pending_actions',
      'consent_accepted': 'check_circle',
      'transaction': 'trending_up'
    };
    return icons[type] || 'info';
  }

  /**
   * Obtenir la couleur du chip pour un statut
   * 
   * @param status Le statut ('completed', 'pending', etc)
   * @returns Classe CSS de couleur
   */
  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'completed': 'accent',
      'pending': 'warn',
      'failed': 'error',
      'high': 'warn',
      'medium': 'primary',
      'low': 'accent'
    };
    return colors[status] || 'primary';
  }

  /**
   * Formater l'heure d'une activité
   * 
   * @param timestamp La date/heure
   * @returns Format humain lisible
   */
  formatTime(timestamp: Date): string {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `Il y a ${minutes} min`;
    } else if (hours < 24) {
      return `Il y a ${hours}h`;
    } else if (days < 7) {
      return `Il y a ${days}j`;
    } else {
      return timestamp.toLocaleDateString('fr-FR');
    }
  }

  /**
   * Ouvrir les détails d'une activité
   * 
   * @param activity L'activité à afficher
   */
  viewActivityDetails(activity: any): void {
    console.log('%c📋 Détails de l\'activité:', 'color: purple;', activity);
    // À implémenter: ouvrir un dialogue ou naviguer vers une page de détails
  }

  /**
   * Naviguer vers les tâches KYC
   */
  goToKycValidation(): void {
    console.log('%c🔗 Navigation vers validation KYC', 'color: blue;');
    this.router.navigate(['/agent/kyc-validation']);
  }

  /**
   * Naviguer vers la gestion des clients
   */
  goToClients(): void {
    console.log('%c🔗 Navigation vers clients', 'color: blue;');
    this.router.navigate(['/agent/clients']);
  }
}
