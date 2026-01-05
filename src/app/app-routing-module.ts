import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './layout/profile/profile.component';
import { RechargeComponent } from './layout/recharge/recharge.component';

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

  {
    path: 'client',
    loadComponent: () =>
      import('./layout/sidebar-client/sidebar-client.component')
        .then(c => c.SidebarClientComponent),
    loadChildren: () =>
      import('./features/client/client-routing.module')
        .then(m => m.ClientRoutingModule)
  },

  {
    path: 'assistant',
    loadComponent: () =>
      import('./layout/assistant-chat/assistant-chat.component')
        .then(m => m.AssistantChatComponent)
  },

  {
    path: 'account/type',
    loadComponent: () =>
      import('./layout/account-type/account-type.component')
        .then(m => m.AccountTypeComponent)
  },

  { path: 'profile', component: ProfileComponent },
  { path: 'recharge', component: RechargeComponent },

  { path: '', redirectTo: '/assistant', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
