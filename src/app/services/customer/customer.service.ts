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
  private baseUrl = 'http://localhost:8000';


  constructor(
    private http: HttpClient,
    private messageService: MessagesService) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl + '/api/customers/')
      .pipe(
        catchError(this.handleError('getCustomers', []))
      );
  }

  getCustomer(id: number): Observable<Customer>{
    return this.http.get<Customer>(this.baseUrl + '/api/customers/' + id)
      .pipe(
        catchError(this.handleError<Customer>('getCustomer'))
      );
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl + '/api/customers/', customer, httpOptions)
      .pipe(
        tap(() => this.log('Customer created')),
        catchError(this.handleError<Customer>('createCustomers'))
      );
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.baseUrl + '/api/customers/' + customer.id, customer, httpOptions)
      .pipe(
        tap(() => this.log('Customer updated')),
        catchError(this.handleError<Customer>('updateCustomers'))
      );
  }

  deleteCustomer(id: string): Observable<Customer> {
    return this.http.delete<Customer>(this.baseUrl + '/api/customers/' + id, httpOptions)
      .pipe(
        tap(() => this.log('Customer deleted')),
        catchError(this.handleError<Customer>('deleteCustomer'))
      );
  }

  private handleError<T> (method = 'noneMethodSpecified', result?: T) {
    return (error: any): Observable<T> => {
      this.log('CustomerService: ' + method + ' failed: ' + error.message)
      console.error(method + ' ' + result);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(message);
  }
}
