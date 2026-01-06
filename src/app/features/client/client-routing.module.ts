import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDashboardComponent } from './dashboard/dashboard.component';
import { TransfertMoneyComponent } from './transfert-money/transfert-money.component';
import { MobileRechargeComponent } from './mobile-recharge/mobile-recharge.component';
import { CryptoWalletComponent } from './crypto-wallet/crypto-wallet.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component')
      .then(m => m.ClientDashboardComponent)
  },
  {
    path: 'transfert-money',
    loadComponent: () => import('./transfert-money/transfert-money.component')
      .then(m => m.TransfertMoneyComponent)
  },
  {
    path: 'mobile-recharge',
    loadComponent: () => import('./mobile-recharge/mobile-recharge.component')
      .then(m => m.MobileRechargeComponent)
  },
  {
    path: 'crypto-wallet',
    loadComponent: () => import('./crypto-wallet/crypto-wallet.component')
      .then(m => m.CryptoWalletComponent)
  },
  {
    path: 'my-profile',
    loadComponent: () => import('./my-profile/my-profile.component')
      .then(m => m.MyProfileComponent)
  },
  {
    path: 'kyc-documents',
    loadComponent: () => import('./client-kyc/client-kyc.component')
      .then(m => m.ClientKycComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {}
