import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
  badge?: number;
}

@Component({
  selector: 'app-backoffice-layout',
  templateUrl: './backoffice-layout.component.html',
  styleUrls: ['./backoffice-layout.component.scss'],
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
    MatBadgeModule
  ]
})
export class BackofficeLayoutComponent {
  currentUser = 'John Doe';
  userRole = 'Administrator';
  isSidenavExpanded = true;

  mainMenuItems: MenuItem[] = [
    { icon: 'dashboard', label: 'Dashboard', route: '/admin/dashboard' },
    { icon: 'supervisor_account', label: 'Agents', route: '/admin/agents', badge: 5 },
    { icon: 'people', label: 'Clients', route: '/admin/clients', badge: 12 },
    { icon: 'assignment_turned_in', label: 'Consents', route: '/admin/consents' },
    { icon: 'account_balance', label: 'Comptes', route: '/admin/accounts' }
  ];

  otherMenuItems: MenuItem[] = [
    { icon: 'settings', label: 'Paramètres', route: '/admin/settings' },
    { icon: 'help_outline', label: 'Aide', route: '/admin/help' }
  ];

  constructor(private router: Router) {}

  toggleSidenav(): void {
    this.isSidenavExpanded = !this.isSidenavExpanded;
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  logout(): void {
    // Logique de déconnexion
    console.log('Déconnexion');
  }
}
