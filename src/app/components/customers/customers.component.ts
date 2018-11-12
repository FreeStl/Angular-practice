import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Customer} from './customer';
import {CustomerService} from '../../services/customer/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[];
  newCustomer: Customer = new Customer();
  showCreateForm = false;

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCustomers()
      .subscribe(customers => this.customers = customers);
  }

  createCustomer(customerForm: NgForm) {
    this.customerService.createCustomer(this.newCustomer)
      .subscribe(customer => {
        customerForm.reset();
        this.newCustomer = new Customer;
        if (customer != null) {
          this.customers.unshift(customer);
        }
      });
  }
  // when 'Add customer' is pressed - show form for adding new customer, when 'submit'/'reset' is preset - hide the form
  formPopUp(): void {
    const form = document.getElementById('customer-form');
    const button = document.getElementById('form-button');
    if (!this.showCreateForm) {
      form.style.display = 'block';
      button.style.display = 'none';
      this.showCreateForm = true;
    } else {
      form.style.display = 'none';
      button.style.display = 'block';
      this.newCustomer = new Customer();
      this.showCreateForm = false;
    }
  }

}
