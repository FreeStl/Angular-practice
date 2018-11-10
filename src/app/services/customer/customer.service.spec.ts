import { TestBed, inject, getTestBed  } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CustomerService } from './customer.service';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../../components/customers/customer';

describe('CustomerService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let customerService: CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CustomerService
      ]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    customerService = TestBed.get(CustomerService);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  describe('getHeroes', () => {
    let expectedcustomers: Customer[];

    beforeEach(() => {
      customerService = TestBed.get(CustomerService);
      expectedcustomers = [
        {id: 1, name: 'Max', address: 'Ukraine', phone: '102', createdAt: null, updatedAt: null},
        {id: 2, name: 'Bob', address: 'Poland', phone: '103', createdAt: null, updatedAt: null}
      ] as Customer[];
    });
    it('should return expected customers (called once)', () =>{
      customerService.getCustomers().subscribe(
        customers => expect(customers).toEqual(
          expectedcustomers, 'should return expected heroes'
        ), fail
      );
      const req = httpTestingController.expectOne(customerService.baseUrl + '/api/customers/');
      req.flush(expectedcustomers);
    });
    it('should be ok with returning no data', () => {
      customerService.getCustomers().subscribe(
        customers => expect(customers.length).toEqual(
          0, 'should return empty array'
        ), fail
      );
      const req = httpTestingController.expectOne(customerService.baseUrl + '/api/customers/');
      req.flush([]);
    });
    it('should return error into empty data', () => {
      customerService.getCustomers().subscribe(
        customers => expect(customers.length).toEqual(
          0, 'should return empty array'
        ), fail
      );
      const req = httpTestingController.expectOne(customerService.baseUrl + '/api/customers/');
      req.flush('404', {status: 404, statusText: 'not found'});
    });
  });
});
