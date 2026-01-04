import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import {ProfileComponent} from './layout/profile/profile.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RechargeComponent} from './layout/recharge/recharge.component';


@NgModule({
  declarations: [
    App,
    ProfileComponent,
    RechargeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
