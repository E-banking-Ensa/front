import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * Routes pour le module Agent
 * Configuration du routage des pages agent
 */
const routes: Routes = [
  // ====== REDIRECTION PAR DÉFAUT ======
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // ====== DASHBOARD ======
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/agent-dashboard/agent-dashboard.component').then(
        m => m.AgentDashboardComponent
      ),
    data: { title: 'Tableau de bord Agent' }
  },

  // ====== CLIENTS ======
  {
    path: 'clients',
    loadComponent: () =>
      import('./clients/agent-clients.component').then(m => m.AgentClientsComponent),
    data: { title: 'Gestion des Clients' }
  },

  // ====== KYC VALIDATION ======
  {
    path: 'kyc-validation',
    loadComponent: () =>
      import('./kyc-validation/kyc-validation.component').then(
        m => m.KycValidationComponent
      ),
    data: { title: 'Validation KYC' }
  },

  // ====== TRANSACTIONS (EXEMPLE) ======
  {
    path: 'transactions',
    loadComponent: () =>
      import('./dashboard/agent-dashboard/agent-dashboard.component').then(
        m => m.AgentDashboardComponent
      ),
    data: { title: 'Transactions' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule {}
