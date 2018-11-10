import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {MessagesService} from '../messages/messages.service';

import {Customer} from '../../components/customers/customer';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl = 'http://localhost:8000';


  constructor(
    private http: HttpClient,
    private messageService: MessagesService) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl + '/api/customers/')
      .pipe(
        catchError(this.handleError('Customers not found', []))
      );
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(this.baseUrl + '/api/customers/' + id)
      .pipe(
        catchError(this.handleError<Customer>('Customer not found', null))
      );
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl + '/api/customers/', customer, httpOptions)
      .pipe(
        tap(() => this.log('Customer created')),
        catchError(this.handleError<Customer>('Failed to create the customer', null))
      );
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.baseUrl + '/api/customers/' + customer.id, customer, httpOptions)
      .pipe(
        tap(() => this.log('Customer updated')),
        catchError(this.handleError<Customer>('Failed to update the customer', null))
      );
  }

  deleteCustomer(id: string): Observable<Customer> {
    return this.http.delete<Customer>(this.baseUrl + '/api/customers/' + id, httpOptions)
      .pipe(
        tap(() => this.log('Customer deleted')),
        catchError(this.handleError<Customer>('Failed to delete the customer', null))
      );
  }

  private handleError<T> (reason = 'No exeption Provided', result?: T) {
    return (error: any): Observable<T> => {
      this.log(reason + ': ' + error.message)
      console.error(reason + ' ' + result);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(message);
  }
}
