import { CanManageAccountsGuard } from './auth/can-manage-accounts.guard';
import { CanReadFullRefsGuard } from './auth/can-read-full-refs.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppStoreModule } from './store/store.module';
import { AboutComponent } from './about.component';
import { AuthenticationService } from './auth/authentication.service';
import { UserService } from './auth/user.service';
import { UserResolver } from './auth/user/user.resolver';
import { AuthGuard } from './auth/auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { UserComponent } from './auth/user/user.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Firebase services + enviorment module
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { CanManageRefsGuard } from './auth/can-manage-refs.guard';
import { CanSearchFullRefsGuard } from './auth/can-search-full-refs.guard';
import { SharedModule } from './shared/shared.module';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    AppRoutingModule,
    AppStoreModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    SharedModule,
  ],
  providers: [AuthenticationService, UserService, UserResolver, AuthGuard,
    CanReadFullRefsGuard,
    CanManageRefsGuard,
    CanSearchFullRefsGuard,
    CanManageAccountsGuard,
    { provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
