import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../services/product';
import { ProductLoaderService } from '../services/product-loader.service';
import { CartService } from '../services/cart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
  providers: [ProductLoaderService, CartService]
})
export class ProductPageComponent implements OnInit {

  private product: Product;
  private selectionForm: FormGroup;
  private packageTypes: string[] = ['Single Bottle (1)', 'Sixpack (6)', 'Full crate (24)'];

  constructor(private route: ActivatedRoute, private productLoaderService: ProductLoaderService, private cartService: CartService) {
    this.route.params.subscribe(params =>
      this.productLoaderService.getProduct(params.id).subscribe(product => {
        this.product = product;
        console.log(this.product);})
      );    
   }

  ngOnInit() {

    this.selectionForm = new FormGroup({
      packageType: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required)
    });

    this.selectionForm.controls['packageType'].setValue(this.packageTypes[0]);
    this.selectionForm.controls['quantity'].setValue(1);

  }

  addToCart() {

    if(this.selectionForm.valid) {
      this.cartService.addToCart(this.product, this.selectionForm.value.packageType, this.selectionForm.value.quantity);
    }

  }

}
