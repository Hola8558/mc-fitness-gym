import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { StatusViewComponent } from './modules/components/status-view/status-view.component';
import { ApartsPageComponent } from './modules/pages/aparts-page/aparts-page.component';
import { NewClientPageComponent } from './modules/pages/new-client-page/new-client-page.component';
import { ProductsPageComponent } from './modules/pages/products-page/products-page.component';
import { RegisterComponentComponent } from './modules/pages/register-component/register-component.component';
import { SearchBarComponent } from './shared/components/search-bar/search-bar.component';
import { SideBarOptionsComponent } from './shared/components/side-bar-options/side-bar-options.component';
import { NewClientComponent } from './shared/components/new-client/new-client.component';
import { SideBarComponent } from './shared/components/side-bar/side-bar.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RenovacionPageComponent } from './modules/pages/renovacion-page/renovacion-page.component';
import { ClientInfoPageComponent } from './modules/pages/client-info-page/client-info-page.component';


@NgModule({
  declarations: [
    AppComponent,

    StatusViewComponent,
    ApartsPageComponent,
    NewClientPageComponent,
    ProductsPageComponent,
    RegisterComponentComponent,
    SearchBarComponent,
    RenovacionPageComponent,
    ClientInfoPageComponent,

    NewClientComponent,
    SideBarComponent,
    SideBarOptionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    RouterModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    BrowserAnimationsModule,
    MatMenuModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
