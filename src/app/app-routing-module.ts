import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackofficeLayoutComponent } from './layout/backoffice-layout/backoffice-layout.component';
import {ProfileComponent} from './layout/profile/profile.component';
import {RechargeComponent} from './layout/recharge/recharge.component';
import {SidebarClientComponent} from './layout/sidebar-client/sidebar-client.component';

const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () =>
      import('./layout/backoffice-layout/backoffice-layout.component')
        .then(c => c.BackofficeLayoutComponent),
    loadChildren: () =>
      import('./features/admin/admin-routing.module')
        .then(m => m.AdminRoutingModule)

  },
  {
    path : 'client',
    loadComponent: () =>
      import('./layout/sidebar-client/sidebar-client.component')
        .then(c => c.SidebarClientComponent),
    loadChildren: () =>
      import('./features/client/client-routing.module')
        .then(m => m.ClientRoutingModule)
  },
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  {path: 'profile', component: ProfileComponent},
  {path: 'recharge', component: RechargeComponent}
];


// const routes: Routes = [
//   {
//     path: 'admin',
//     component: BackofficeLayoutComponent,
//     loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)
//   },
//   // {
//   //   path: 'agent',  // À ajouter plus tard quand tu feras le module agent
//   //   component: BackofficeLayoutComponent,
//   //   loadChildren: () => import('./features/agent/agent.module').then(m => m.AgentModule)
//   // },
//   // {
//   //   path: 'client', // À laisser pour ton ami plus tard
//   //   // component: ClientLayoutComponent,
//   //   loadChildren: () => import('./features/client/client.module').then(m => m.ClientModule)
//   // },
//   { path: '', redirectTo: '/admin', pathMatch: 'full' }, // Page d'accueil → admin
//   { path: '**', redirectTo: '/admin' } // Toute autre URL → admin
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
