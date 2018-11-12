import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {CustomersComponent} from './components/customers/customers.component';
import {ProductsComponent} from './components/products/products.component';
import {CustomerDetailsComponent} from './components/customer-details/customer-details.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';

const routers: Routes = [
  {path: 'customers', component: CustomersComponent},
  {path: 'products', component: ProductsComponent},
  { path: 'customers/:id', component: CustomerDetailsComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: '**', redirectTo: '#', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routers)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
