import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../services/product';

@Component({
  selector: 'app-catalogue-item',
  templateUrl: './catalogue-item.component.html',
  styleUrls: ['./catalogue-item.component.css']
})
export class CatalogueItemComponent implements OnInit {

  @Input()
  private product: Product;

  constructor() { }

  ngOnInit() {
  }

}
