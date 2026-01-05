import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './layout/profile/profile.component';
import { RechargeComponent } from './layout/recharge/recharge.component';
import { AccountTypeComponent } from './layout/account-type/account-type.component';
import { AssistantChatComponent } from './layout/assistant-chat/assistant-chat.component';

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

  { path: 'account/type', component: AccountTypeComponent },

  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  { path: 'recharge', component: RechargeComponent },
  { path: 'assistant', component: AssistantChatComponent },
  { path: '', redirectTo: '/assistant', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
