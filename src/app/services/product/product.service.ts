import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessagesService} from '../messages/messages.service';
import {Observable, of} from 'rxjs';
import {Product} from '../../components/products/product';
import {catchError, tap} from 'rxjs/operators';
import {Customer} from '../../components/customers/customer';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8000';


  constructor(
    private http: HttpClient,
    private messageService: MessagesService) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + '/api/products/')
      .pipe(
        catchError(this.handleError('getProducts', []))
      );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + '/api/products/' + id)
      .pipe(
        catchError(this.handleError<Product>('getProduct'))
      );
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl + '/api/products/', product, httpOptions)
      .pipe(
        tap(() => this.log('Product created')),
        catchError(this.handleError<Product>('createProducts'))
      );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.baseUrl + '/api/products/' + product.id, product, httpOptions)
      .pipe(
        tap(() => this.log('Product updated')),
        catchError(this.handleError<Product>('updateProducts'))
      );
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(this.baseUrl + '/api/products/' + id, httpOptions)
      .pipe(
        tap(() => this.log('Product deleted')),
        catchError(this.handleError<Product>('deleteProduct'))
      );
  }

  private handleError<T> (method = 'noneMethodSpecified', result?: T) {
    return (error: any): Observable<T> => {
      this.log('ProductService: ' + method + ' failed: ' + error.message)
      console.error(method + ' ' + result);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(message);
  }
}
