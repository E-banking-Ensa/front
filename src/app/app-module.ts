import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { UserLogin } from './layout/user-login/user-login';
import { UserRegistration } from './layout/user-registration/user-registration';
import { ForgotPassword } from './layout/forgot-password/forgot-password';

@NgModule({
  declarations: [
    App,
    UserLogin,
    UserRegistration,
    ForgotPassword
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
