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
        if (product != null) {
          this.products.unshift(product);
        }
      });
  }

  // when 'Add product' is pressed - show form for adding new product, when 'submit'/'reset' is preset - hide the form
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
