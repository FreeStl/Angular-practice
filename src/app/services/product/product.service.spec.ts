import { TestBed, inject, getTestBed  } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductService } from './product.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Product} from '../../components/products/product';
import {fail} from 'assert';

describe('ProductService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductService
      ]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    productService = TestBed.get(ProductService);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  describe('getProducts', () => {
    let expectedProducts: Product[];

    beforeEach(() => {
      productService = TestBed.get(ProductService);
      expectedProducts = [
        {id: 1, name: 'Table', price: 100, createdAt: null, updatedAt: null},
        {id: 2, name: 'Chair', price: 50, createdAt: null, updatedAt: null}
      ] as Product[];
    });

    it('should return expected products (called once)', () => {
      productService.getProducts().subscribe(
        products => expect(products).toEqual(
          expectedProducts, 'should return expected heroes'
        ), fail
      );
      const req = httpTestingController.expectOne(productService.baseUrl + '/api/products/');
      req.flush(expectedProducts);
    });

    it('should be ok with returning no data', () => {
      productService.getProducts().subscribe(
        products => expect(products.length).toEqual(
          0, 'should return empty array'
        ), fail
      );
      const req = httpTestingController.expectOne(productService.baseUrl + '/api/products/');
      req.flush([]);
    });

    it('should return error into empty data', () => {
      productService.getProducts().subscribe(
        products => expect(products.length).toEqual(
          0, 'should return empty array'
        ), fail
      );
      const req = httpTestingController.expectOne(productService.baseUrl + '/api/products/');
      req.flush('404', {status: 404, statusText: 'not found'});
    });
  });

  describe('getProduct', () => {
    let expectedProduct: Product;

    beforeEach(() => {
      productService = TestBed.get(ProductService);
      expectedProduct = {
        id: 1, name: 'Table', price: 100, createdAt: null, updatedAt: null
      };
    });

    it('should return one product', () => {
      productService.getProduct(expectedProduct.id).subscribe(
        product => expect(product).toEqual(expectedProduct,
          'Should return one product'), fail
      );
      const req = httpTestingController.expectOne(
        productService.baseUrl + '/api/products/' + expectedProduct.id);
      req.flush(expectedProduct);
    });

    it('should return error object with undefined values', () => {
      productService.getProduct(expectedProduct.id).subscribe(
        product => expect(product).toBeNull(
          'should object with undefined values'
        ), fail
      );
      const req = httpTestingController.expectOne(
        productService.baseUrl + '/api/products/' + expectedProduct.id
      );
      req.flush('404', {status: 404, statusText: 'not found'});
    });

  });

  describe('createProduct', () => {
    let expectedProduct: Product;

    beforeEach(() => expectedProduct = {
      id: 1, name: 'Table', price: 100, createdAt: null, updatedAt: null
    });

    it('should create a product and return it', () => {
      productService.createProduct(expectedProduct).subscribe(
        product => expect(product).toEqual(
          expectedProduct, 'should return the product'), fail
      );

      const req = httpTestingController.expectOne(
        productService.baseUrl + '/api/products/'
      );
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(expectedProduct);
      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: expectedProduct });
      req.event(expectedResponse);
    });

    it('should return the error into null', () => {
      productService.createProduct(expectedProduct).subscribe(
        product => expect(product).toBeNull(
          'should return the null'
        ), fail
      );

      const req = httpTestingController.expectOne(
        productService.baseUrl + '/api/products/'
      );
      req.flush('404', {status: 404, statusText: 'Not Found'});
    });
  });

  describe('updateProduct', () => {
    let expectedProduct: Product;

    beforeEach(() => expectedProduct = {
      id: 1, name: 'Table', price: 100, createdAt: null, updatedAt: null
    });

    it('should update a product and return it', () => {

      productService.updateProduct(expectedProduct).subscribe(
        data => expect(data).toEqual(expectedProduct, 'should return the hero'),
        fail
      );

      // HeroService should have made one request to PUT hero
      const req = httpTestingController.expectOne(
        productService.baseUrl + '/api/products/' + expectedProduct.id);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(expectedProduct);

      // Expect server to return the hero after PUT
      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: expectedProduct });
      req.event(expectedResponse);
    });

    it('should return the error into null', () => {
      productService.updateProduct(expectedProduct).subscribe(
        product => expect(product).toBeNull(
          'should return the null'
        ), fail
      );

      const req = httpTestingController.expectOne(
        productService.baseUrl + '/api/products/' + expectedProduct.id
      );
      req.flush('404', {status: 404, statusText: 'Not Found'});
    });

  });

  describe('deleteProduct', () => {
    let expectedProduct: Product;

    beforeEach(() => expectedProduct = {
      id: 1, name: 'Table', price: 100, createdAt: null, updatedAt: null
    });

    it('should delete a product and return it', () => {

      productService.deleteProduct(`${expectedProduct.id}`).subscribe(
        product => expect(product).toEqual(expectedProduct, 'should return the hero'),
        fail
      );

      const req = httpTestingController.expectOne(
        productService.baseUrl + `/api/products/${expectedProduct.id}`);
      expect(req.request.method).toEqual('DELETE');

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: expectedProduct });
      req.event(expectedResponse);
    });

    it('should return the error into null', () => {
      productService.deleteProduct(`${expectedProduct.id}`).subscribe(
        product => expect(product).toBeNull(
          'should return the null'
        ), fail
      );

      const req = httpTestingController.expectOne(
        productService.baseUrl + '/api/products/' + expectedProduct.id
      );
      req.flush('404', {status: 404, statusText: 'Not Found'});
    });
  });
});






