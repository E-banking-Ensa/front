import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';

/**
 * Composant AgentLayoutComponent
 * 
 * Fournit le layout principal pour le module agent avec:
 * - Une barre d'outils (toolbar) en haut
 * - Une barre latérale (sidebar) avec navigation
 * - Zone de contenu pour les routes enfants
 * 
 * Structure:
 * ┌─────────────────────────────┐
 * │      TOOLBAR (Agent)        │
 * ├────────────┬────────────────┤
 * │  SIDEBAR   │  CONTENT AREA  │
 * │  - Nav    │  (Router       │
 * │  - Links  │   Outlet)      │
 * │           │                │
 * └────────────┴────────────────┘
 */
@Component({
  selector: 'app-agent-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    MatTooltipModule,
    MatBadgeModule
  ],
  templateUrl: './agent-layout.component.html',
  styleUrls: ['./agent-layout.component.scss']
})
export class AgentLayoutComponent implements OnInit {
  
  /**
   * Flag pour contrôler l'état ouvert/fermé de la sidebar
   * true = sidebar ouverte, false = sidebar fermée
   */
  isSidebarOpen = true;

  /**
   * Liste des items de navigation dans la sidebar
   * Utilisé par le template pour générer les liens
   */
  navItems = [
    {
      label: '📊 Dashboard',
      icon: 'dashboard',
      route: '/agent/dashboard',
      tooltip: 'Tableau de bord agent'
    },
    {
      label: '👥 Clients',
      icon: 'people',
      route: '/agent/clients',
      tooltip: 'Gestion des clients'
    },
    {
      label: '📄 Validation KYC',
      icon: 'verified_user',
      route: '/agent/kyc-validation',
      tooltip: 'Valider les documents KYC'
    },
    {
      label: '💰 Transactions',
      icon: 'trending_up',
      route: '/agent/transactions',
      tooltip: 'Historique des transactions'
    }
  ];

  /**
   * Informations de l'utilisateur connecté
   * À remplacer par un service d'authentification réel
   */
  agentInfo = {
    name: 'Agent Bancaire',
    email: 'agent@bank.com',
    avatar: '👤' // Icône emoji simple
  };

  constructor(private router: Router) {}

  /**
   * Initialisation du composant
   */
  ngOnInit(): void {
    // Initialiser les données si nécessaire
    console.log('%c✅ AgentLayoutComponent initialisé', 'color: green; font-weight: bold;');
  }

  /**
   * Basculer l'état de la sidebar (ouverte/fermée)
   * Utilisé par le bouton de contrôle dans la toolbar
   */
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log(`%c🔄 Sidebar ${this.isSidebarOpen ? 'ouverte' : 'fermée'}`, 'color: blue;');
  }

  /**
   * Naviguer vers une route spécifique
   * 
   * @param route La route vers laquelle naviguer (ex: '/agent/clients')
   */
  navigateTo(route: string): void {
    this.router.navigate([route]);
    console.log(`%c🔗 Navigation vers: ${route}`, 'color: purple;');
  }

  /**
   * Se déconnecter et revenir à la page de login
   * À intégrer avec le service d'authentification
   */
  logout(): void {
    console.log('%c👋 Déconnexion...', 'color: red; font-weight: bold;');
    // this.authService.logout();
    // this.router.navigate(['/login']);
  }

  /**
   * Déterminer la classe CSS pour un item de navigation
   * En fonction de la route actuelle
   * 
   * @param route La route de l'item
   * @returns Classe CSS à appliquer
   */
  getNavItemClass(route: string): string {
    return this.router.url.includes(route) ? 'nav-item-active' : '';
  }
}
