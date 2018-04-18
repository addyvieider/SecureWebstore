import { Injectable } from '@angular/core';
import { Product } from './product';
import { HttpModule, Response } from '@angular/http';
import { HttpClient, HttpClientModule } from'@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductLoaderService {

  public totalProducts: number = 0;
  public _currentPage: number = 1;
  public pageSize: number = 1;
  public products: Product[];

  constructor(private http: HttpClient) { }

  get startIndex() {
    return (this._currentPage - 1) * this.pageSize;
  }

  set currentPage(val: number) {
    if(val !== this._currentPage) {
      this._currentPage = val;
      this.getProducts();
    }
  }

  get totalPages() {
    try {
      return Math.ceil(this.totalProducts / this.pageSize);
    } catch (e) {
      console.error(e);
      return 0;
    }
  }

  get currentPage() {
    return this._currentPage;
  }

  public getProducts() {

    this.products = [];
    //this.products.push(new Product("1", "Test 1", 123));
    //this.products.push(new Product("2", "Test 2", 234));

    this.http.get('/api/products?page='+this.currentPage+"&display="+this.pageSize).subscribe(res => { 
      console.log(res);
      
      for (let p in res["products"]) {
        this.products.push(this.productFactory(res["products"][p]));
      }
      this.totalProducts = res["totalRows"];
    }
    );


  }

  private productFactory(product: any): Product {
    return new Product(
      product.id,
      product.name,
      product.price
    )
  }

}
