import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackofficeLayoutComponent } from './layout/backoffice-layout/backoffice-layout.component';

import { UserLogin } from './layout/user-login/user-login';
import { UserRegistration } from './layout/user-registration/user-registration';
import { ForgotPassword } from './layout/forgot-password/forgot-password';

const routes: Routes = [
  { path: 'login', component: UserLogin },
  { path: 'register', component: UserRegistration },
  { path: 'forgot-password', component: ForgotPassword },
  {
    path: 'admin',
    loadComponent: () =>
      import('./layout/backoffice-layout/backoffice-layout.component')
        .then(c => c.BackofficeLayoutComponent),
    loadChildren: () =>
      import('./features/admin/admin-routing.module')
        .then(m => m.AdminRoutingModule)
  },
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: '**', redirectTo: '/admin' }
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
