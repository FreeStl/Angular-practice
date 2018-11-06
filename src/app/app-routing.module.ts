import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {CustomersComponent} from './components/customers/customers.component';
import {ProductsComponent} from './components/products/products.component';

const routers: Routes = [
  {path: 'customers', component: CustomersComponent},
  {path: 'products', component: ProductsComponent},
  { path: '**', redirectTo: '#', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routers)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
