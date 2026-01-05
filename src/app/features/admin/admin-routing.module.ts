// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
//
// const routes: Routes = [
//   { path: '', component: AdminDashboardComponent }
// ];
//
// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class AdminRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { AgentsComponent } from './agents/agents.component';
import { ConsentTypesComponent} from './consents/consents.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/admin-dashboard/admin-dashboard.component')
      .then(m => m.AdminDashboardComponent)
  },
  {
    path: 'agents',
    loadComponent: () => import('./agents/agents.component')
      .then(m => m.AgentsComponent)
  },
  {
    path: 'clients',
    loadComponent: () => import('./clients/clients.component')
      .then(m => m.ClientsComponent)
  },
  {
    path: 'consents',
    loadComponent: () => import('./consents/consents.component')
      .then(m => m.ConsentTypesComponent)
  },
  // {
  //   path: 'accounts',
  //   loadComponent: () => import('./dashboard/admin-dashboard/admin-dashboard.component')
  //     .then(m => m.AdminDashboardComponent) // Temporaire, créer le composant plus tard
  // }
  {
    path: 'accounts/:name/:clientId',
    loadComponent: () => import('./accounts/accounts.component')
      .then(m => m.AccountsComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
