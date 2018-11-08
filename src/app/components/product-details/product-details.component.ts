import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Product} from '../products/product';
import {ProductService} from '../../services/product/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product = new Product();
  editingProduct: Product = new Product();
  editing = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getProduct();
  }

  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
  }

  updateProduct(editedProduct: Product): void {
    this.productService.updateProduct(editedProduct)
      .subscribe(product => {
        Object.assign(this.product, product);
        this.clearEditing();
      });
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id)
      .subscribe(() => this.goBack());
  }

  editProduct(product: Product): void {
    this.editing = true;
    Object.assign(this.editingProduct, product);
  }

  clearEditing(): void {
    this.editingProduct = new Product();
    this.editing = false;
  }


  goBack(): void {
    this.location.back();
  }
}
