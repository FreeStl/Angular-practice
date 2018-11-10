import { TestBed, inject, getTestBed  } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CustomerService } from './customer.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Customer} from '../../components/customers/customer';
import {fail} from 'assert';

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

  describe('getCustomers', () => {
    let expectedCustomers: Customer[];

    beforeEach(() => {
      customerService = TestBed.get(CustomerService);
      expectedCustomers = [
        {id: 1, name: 'Max', address: 'Ukraine', phone: '102', createdAt: null, updatedAt: null},
        {id: 2, name: 'Bob', address: 'Poland', phone: '103', createdAt: null, updatedAt: null}
      ] as Customer[];
    });

    it('should return expected customers (called once)', () => {
      customerService.getCustomers().subscribe(
        customers => expect(customers).toEqual(
          expectedCustomers, 'should return expected heroes'
        ), fail
      );
      const req = httpTestingController.expectOne(customerService.baseUrl + '/api/customers/');
      req.flush(expectedCustomers);
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

  describe('getCustomer', () => {
    let expectedCustomer: Customer;

    beforeEach(() => {
      customerService = TestBed.get(CustomerService);
      expectedCustomer =
        {id: 1, name: 'Max', address: 'Ukraine', phone: '102', createdAt: null, updatedAt: null} as Customer;
    });

    it('should return one customer', () => {
      customerService.getCustomer(expectedCustomer.id).subscribe(
        customer => expect(customer).toEqual(expectedCustomer,
          'Should return one customer'), fail
      );
      const req = httpTestingController.expectOne(
        customerService.baseUrl + '/api/customers/' + expectedCustomer.id);
      req.flush(expectedCustomer);
    });

    it('should return error object with undefined values', () => {
      customerService.getCustomer(expectedCustomer.id).subscribe(
        customer => expect(customer).toBeNull(
          'should object with undefined values'
        ), fail
      );
      const req = httpTestingController.expectOne(
        customerService.baseUrl + '/api/customers/' + expectedCustomer.id
      );
      req.flush('404', {status: 404, statusText: 'not found'});
    });

  });

  describe('createCustomer', () => {
    let expectedCustomer: Customer;

    beforeEach(() => expectedCustomer = {
      id: 1, name: 'Max', address: 'Ukraine', phone: '102', createdAt: null, updatedAt: null
    });

    it('should create a customer and return it', () => {
      customerService.createCustomer(expectedCustomer).subscribe(
        customer => expect(customer).toEqual(
          expectedCustomer, 'should return the customer'), fail
      );

      const req = httpTestingController.expectOne(
        customerService.baseUrl + '/api/customers/'
      );
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(expectedCustomer);
      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: expectedCustomer });
      req.event(expectedResponse);
    });

    it('should return the error into null', () => {
      customerService.createCustomer(expectedCustomer).subscribe(
        customer => expect(customer).toBeNull(
          'should return the null'
        ), fail
      );

      const req = httpTestingController.expectOne(
        customerService.baseUrl + '/api/customers/'
      );
      req.flush('404', {status: 404, statusText: 'Not Found'});
    });
  });

  describe('updateCustomer', () => {
    let expectedCustomer: Customer;

    beforeEach(() => expectedCustomer = {
      id: 1, name: 'Max', address: 'Ukraine', phone: '102', createdAt: null, updatedAt: null
    });

    it('should update a customer and return it', () => {

      customerService.updateCustomer(expectedCustomer).subscribe(
        data => expect(data).toEqual(expectedCustomer, 'should return the hero'),
        fail
      );

      // HeroService should have made one request to PUT hero
      const req = httpTestingController.expectOne(
        customerService.baseUrl + '/api/customers/' + expectedCustomer.id);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(expectedCustomer);

      // Expect server to return the hero after PUT
      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: expectedCustomer });
      req.event(expectedResponse);
    });

    it('should return the error into null', () => {
      customerService.updateCustomer(expectedCustomer).subscribe(
        customer => expect(customer).toBeNull(
          'should return the null'
        ), fail
      );

      const req = httpTestingController.expectOne(
        customerService.baseUrl + '/api/customers/' + expectedCustomer.id
      );
      req.flush('404', {status: 404, statusText: 'Not Found'});
    });

  });

  describe('deleteCustomer', () => {
    let expectedCustomer: Customer;

    beforeEach(() => expectedCustomer = {
      id: 1, name: 'Max', address: 'Ukraine', phone: '102', createdAt: null, updatedAt: null
    });

    it('should delete a customer and return it', () => {

      customerService.deleteCustomer(`${expectedCustomer.id}`).subscribe(
        customer => expect(customer).toEqual(expectedCustomer, 'should return the hero'),
        fail
      );

      const req = httpTestingController.expectOne(
        customerService.baseUrl + `/api/customers/${expectedCustomer.id}`);
      expect(req.request.method).toEqual('DELETE');

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: expectedCustomer });
      req.event(expectedResponse);
    });

    it('should return the error into null', () => {
      customerService.deleteCustomer(`${expectedCustomer.id}`).subscribe(
        customer => expect(customer).toBeNull(
          'should return the null'
        ), fail
      );

      const req = httpTestingController.expectOne(
        customerService.baseUrl + '/api/customers/' + expectedCustomer.id
      );
      req.flush('404', {status: 404, statusText: 'Not Found'});
    });
  });
});






