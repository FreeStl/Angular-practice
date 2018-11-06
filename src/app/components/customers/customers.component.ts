import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Customer} from './customer';
import {CustomerService} from '../../services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[];

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit() {
  }

  getCustomers(): void {
    //this.customerService.
  }

}
