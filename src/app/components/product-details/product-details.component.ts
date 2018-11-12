import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Product} from '../products/product';
import {ProductService} from '../../services/product/product.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product = new Product();
  editingProduct: Product = new Product();
  editing = false;
  notFound = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location,
    // private router: Router

  ) { }

  ngOnInit() {
    this.getProduct();
  }
  // if object exist show it, if not - show error
  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id)
      .subscribe(product => {
        if (product != null) {
          this.product = product;
        } else {
          this.notFound = true;
        }
      });
  }

  updateProduct(editedProduct: Product): void {
    this.productService.updateProduct(editedProduct)
      .subscribe(product => {
        if (product != null) {
          Object.assign(this.product, product);
        }
        this.clearEditing();
      });
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id)
      .subscribe(() => this.goBack());
  }
  // enter the editing mode
  editProduct(product: Product): void {
    this.editing = true;
    Object.assign(this.editingProduct, product);
  }

  clearEditing(): void {
    this.editingProduct = new Product();
    this.editing = false;
  }

  // go back to the list
  goBack(): void {
    this.location.back();
    // can also be this.router.navigateByUrl('/products');
  }
}
