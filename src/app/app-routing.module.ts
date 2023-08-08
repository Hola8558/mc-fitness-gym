import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApartsPageComponent } from './modules/pages/aparts-page/aparts-page.component';
import { NewClientPageComponent } from './modules/pages/new-client-page/new-client-page.component';
import { ProductsPageComponent } from './modules/pages/products-page/products-page.component';
import { RegisterComponentComponent } from './modules/pages/register-component/register-component.component';
import { RenovacionPageComponent } from './modules/pages/renovacion-page/renovacion-page.component';
import { ClientInfoPageComponent } from './modules/pages/client-info-page/client-info-page.component';

const routes: Routes = [
  {
    path: 'registros',
    component: RegisterComponentComponent
  },
  {
    path: 'productos',
    component: ProductsPageComponent
  },
  {
    path: 'apartados',
    component: ApartsPageComponent
  },
  {
    path: 'new-client',
    component: NewClientPageComponent
  },
  {
    path: 'renovacion',
    component: RenovacionPageComponent
  },
  {
    path: 'client/:cuenta',
    component: ClientInfoPageComponent
  },
  {
    path: '**',
    redirectTo: 'registros'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
