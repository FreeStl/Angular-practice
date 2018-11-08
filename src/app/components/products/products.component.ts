import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import {Product} from './product';
import {ProductService} from '../../services/product/product.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  newProduct: Product = new Product();
  editingProduct: Product = new Product();
  editing = false;
  showCreateForm = false;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }

  createProduct(productForm: NgForm) {
    this.productService.createProduct(this.newProduct)
      .subscribe(product => {
        productForm.reset();
        this.newProduct = new Product;
        this.products.unshift(product);
      });
  }

  updateProduct(editedProduct: Product): void {
    this.productService.updateProduct(editedProduct)
      .subscribe(product => {
        const currentProduct = this.products.find(item => item.id === item.id);
        Object.assign(currentProduct, product);
        this.clearEditing();
      });
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id)
      .subscribe(
        () => this.products = this.products.filter(item => item.id !== +id)
      );
  }

  editProduct(product: Product): void {
    this.editing = true;
    Object.assign(this.editingProduct, product);
  }

  clearEditing(): void {
    this.editingProduct = new Product();
    this.editing = false;
  }

  formPopUp(): void {
    const form = document.getElementById('product-form');
    const button = document.getElementById('form-button');
    if (!this.showCreateForm) {
      form.style.display = 'block';
      button.style.display = 'none';
      this.showCreateForm = true;
    } else {
      form.style.display = 'none';
      button.style.display = 'block';
      this.newProduct = new Product();
      this.showCreateForm = false;
    }
  }
}
