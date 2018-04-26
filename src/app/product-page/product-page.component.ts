import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../services/product';
import { ProductLoaderService } from '../services/product-loader.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
  providers: [ProductLoaderService]
})
export class ProductPageComponent implements OnInit {

  private product: Product;

  constructor(private route: ActivatedRoute, private productLoaderService: ProductLoaderService) {
    this.route.params.subscribe(params =>
      this.productLoaderService.getProduct(params.id).subscribe(product => {
        this.product = product;
        console.log(this.product);})
      );    
   }

  ngOnInit() {
  }

}
