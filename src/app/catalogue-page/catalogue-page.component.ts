import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-catalogue-page',
  templateUrl: './catalogue-page.component.html',
  styleUrls: ['./catalogue-page.component.css']
})
export class CataloguePageComponent implements OnInit {

  @Input()
  private currentPage: number = 1;

  @Input()
  private totalPages: number = 0;

  @Output()
  private changePage: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  next() {
    if(this.currentPage < this.totalPages) {
      this.changePage.emit(this.currentPage+1);
    }
  }

  previous() {
    if(this.currentPage > 1) {
      this.changePage.emit(this.currentPage-1);
    }
  }

}
