import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Route, RouteReuseStrategy } from '@angular/router';

import { MatIconRegistry } from '@angular/material';
import { ToasterModule } from 'angular2-toaster';

import { AuthGuard } from './shared/auth-guard.service';
import { routes } from './app.routes';
import { SharedModule } from './shared/shared.module';

import { UsersModule } from './users/users.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    // Angular modules
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { useHash: true }),
    HttpModule,
    FormsModule,
    // 3rd party modules
    ToasterModule.forRoot(),
    // App modules
    SharedModule,
    UsersModule,
  ],
  providers: [
    MatIconRegistry,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    public matIconRegistry: MatIconRegistry
  ) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}
