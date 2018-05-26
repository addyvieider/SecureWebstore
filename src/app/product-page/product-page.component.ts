import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../services/product';
import { ProductLoaderService } from '../services/product-loader.service';
import { CartService } from '../services/cart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Package } from '../services/package';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
  providers: [ProductLoaderService, CartService]
})
export class ProductPageComponent implements OnInit {

  private product: Product;
  private selectionForm: FormGroup;
  private packageTypes: Package[];

  constructor(private route: ActivatedRoute, private productLoaderService: ProductLoaderService, private cartService: CartService) {
    this.route.params.subscribe(params =>
      this.productLoaderService.getProduct(params.id).subscribe(productList => {

        this.packageTypes = [];
        for(let p in productList) {
         this.packageTypes.push(this.productLoaderService.packageFactory(productList[p]));
        }

        this.selectionForm.controls['packageType'].setValue(this.packageTypes[0]);
        this.product = this.productLoaderService.productFactory(productList[0]);
        console.log(this.product);})
      );    
   }

  ngOnInit() {

    this.selectionForm = new FormGroup({
      packageType: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required)
    });

    this.selectionForm.controls['quantity'].setValue(1);

  }

  addToCart() {

    if(this.selectionForm.valid) {
      //console.log(this.selectionForm.value.packageType);
      this.cartService.addToCart(this.product, this.selectionForm.value.packageType, this.selectionForm.value.quantity);

      console.log(this.cartService.getCartContent());
    }

  }

}
