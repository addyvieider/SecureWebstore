import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProductLoaderService } from '../services/product-loader.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css'],
  providers: [ProductLoaderService]
})
export class CatalogueComponent implements OnInit {

  constructor(private productLoaderService: ProductLoaderService) {
    this.productLoaderService.getProducts();
   }

  ngOnInit() {
  }

}
