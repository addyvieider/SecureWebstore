import { Injectable, trigger } from '@angular/core';
import { CartService } from './cart.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from './order';

@Injectable()
export class CheckoutService {

  constructor(private http: HttpClient, private cartService: CartService , private router: Router) { }

  checkout(name: string, address: string) {

    this.http.post('/api/order', {
      orderItems: this.cartService.getCartContent(),
      name: name,
      address: address
    }, {
      withCredentials: true
    }).subscribe(res => {
      
      this.cartService.clearCart();
      this.router.navigate(['/user']);

    }, err => {
      if(err.status == 401) {
        alert("Please login before checking out");
      } else {
        alert("Something went wrong");
      }
      //console.log(err);
    });

  }


  getOrders(): Observable<any> {

    return this.http.get('/api/orders', {
      withCredentials: true
    });

  }

  getAllOrders(): Observable<Order[]> {

    return this.http.get('/api/allorders', {
      withCredentials: true
    }).map(res => {

      let orders = [];
      for(let r in res) {

        let order = res[r];
        let id = order["id"];
        let old = orders.findIndex(o => {
          return o.id == id;
        });
        
        if(old >= 0) {

          orders[old].product.push({product: order["product"], package: order["package"], quantity: order["quantity"]});

        } else {

          orders.push(new Order(id, order["name"], order["address"], [{product: order["product"], package: order["package"], quantity: order["quantity"]}]));

        }
      }

      return orders;

    });

  }

}
