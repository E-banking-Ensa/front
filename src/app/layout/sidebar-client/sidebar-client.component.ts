// ================================================
// sidebar-client.component.ts
// ================================================

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-sidebar-client',
  templateUrl: './sidebar-client.component.html',
  styleUrls: ['./sidebar-client.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule
  ]
})
export class SidebarClientComponent {
  menuItems: MenuItem[] = [
    { icon: 'dashboard', label: 'Dashboard', route: '/client/dashboard' },
    { icon: 'card_membership', label: 'Documents KYC', route: '/client/kyc-documents' },
    { icon: 'sync_alt', label: 'Transfert Mony', route: '/client/transfert-money' },
    { icon: 'smartphone', label: 'Mobile Recharge', route: '/client/mobile-recharge' },
    { icon: 'account_balance_wallet', label: 'Crypto Wallet', route: '/client/crypto-wallet' },
    { icon: 'person', label: 'My Profile', route: '/client/my-profile' }
  ];

  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  logout(): void {
    console.log('Déconnexion');
    // TODO: Implémenter la logique de déconnexion
    this.router.navigate(['/login']);
  }
}
