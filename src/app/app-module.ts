import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { UserLogin } from './layout/user-login/user-login';
import { UserRegistration } from './layout/user-registration/user-registration';
import { ForgotPassword } from './layout/forgot-password/forgot-password';
import { authInterceptor } from './core/auth/auth.interceptor';

@NgModule({
  declarations: [
    App,
    UserLogin,
    UserRegistration,
    ForgotPassword
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authInterceptor]))
  ],
  bootstrap: [App]
})
export class AppModule { }
