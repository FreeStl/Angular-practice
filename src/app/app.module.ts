import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ProductsComponent } from './components/products/products.component';
import { CustomersComponent } from './components/customers/customers.component';
import { AppRoutingModule } from './/app-routing.module';
import { MessagesComponent } from './components/messages/messages.component';
import {CustomerService} from './services/customer/customer.service';
import {MessagesService} from './services/messages/messages.service';
import {ProductService} from './services/product/product.service';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CustomersComponent,
    MessagesComponent,
    CustomerDetailsComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    CustomerService,
    ProductService,
    MessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
