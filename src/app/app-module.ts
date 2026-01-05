import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { ProfileComponent } from './layout/profile/profile.component';
import { RechargeComponent } from './layout/recharge/recharge.component';
import { AccountTypeComponent } from './layout/account-type/account-type.component';
import { AssistantChatComponent } from './layout/assistant-chat/assistant-chat.component';
@NgModule({
  declarations: [
    App,
    ProfileComponent,
    RechargeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  bootstrap: [App]
})
export class AppModule {}
