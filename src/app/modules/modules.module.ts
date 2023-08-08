import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { StatusViewComponent } from './components/status-view/status-view.component';
import { ApartsPageComponent } from './pages/aparts-page/aparts-page.component';
import { NewClientPageComponent } from './pages/new-client-page/new-client-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { RegisterComponentComponent } from './pages/register-component/register-component.component';
import { SearchBarComponent } from '../shared/components/search-bar/search-bar.component';
import { RenovacionPageComponent } from './pages/renovacion-page/renovacion-page.component';
import { ClientInfoPageComponent } from './pages/client-info-page/client-info-page.component';


@NgModule({
  imports: [
    RouterModule
  ],
  exports: [
//    ApartsPageComponent,
//    NewClientPageComponent,
//    ProductsPageComponent,
//    RegisterComponentComponent,
//    ServicesPageComponent
  ],
  declarations: [
//    StatusViewComponent,
//    ApartsPageComponent,
//    NewClientPageComponent,
//    ProductsPageComponent,
//    RegisterComponentComponent,
//    SearchBarComponent,
//    ServicesPageComponent
  ],
  providers: [],
})
export class ModulesModule { }
