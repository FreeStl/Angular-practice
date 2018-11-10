import { Component, OnInit } from '@angular/core';
import {Customer} from '../customers/customer';
import {CustomerService} from '../../services/customer/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  customer: Customer = new Customer();
  editingCustomer: Customer = new Customer();
  editing = false;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getCustomer();
  }

  getCustomer(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.customerService.getCustomer(id)
      .subscribe(customer => this.customer = customer);
  }

  updateCustomer(editedCustomer: Customer): void {
    this.customerService.updateCustomer(editedCustomer)
      .subscribe(customer => {
        this.clearEditing();
        if (customer != null) {
          Object.assign(this.customer, customer);
        }
      });
  }

  deleteCustomer(id: string): void {
    this.customerService.deleteCustomer(id)
      .subscribe(() => this.goBack());
  }

  editCustomer(customer: Customer): void {
    this.editing = true;
    Object.assign(this.editingCustomer, customer);
  }

  clearEditing(): void {
    this.editingCustomer = new Customer();
    this.editing = false;
  }


  goBack(): void {
    this.location.back();
  }
}
