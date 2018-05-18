import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CartItem } from './cartItem';

@Injectable()
export class CartService {

  private cartName : string = "cart";

  constructor(private http: HttpClient) { }

  addToCart(product: Product, packageType: string, quantity: number) {

    let cartJson = localStorage.getItem(this.cartName);
    
    if(cartJson) {
      let cart: CartItem[] = JSON.parse(cartJson);
      let itemAlreadyInCart: boolean = false;

      for(let itemInCart of cart) {

        console.log(itemInCart);

        if(itemInCart.product.id == product.id) {
          console.log("Already in cart");
          itemAlreadyInCart = true;
          break;
        } 
      }

      if(!itemAlreadyInCart) {
        cart.push(new CartItem(product,quantity));
        localStorage.setItem(this.cartName, JSON.stringify(cart));
      }
      
    } else {
      localStorage.setItem(this.cartName, JSON.stringify([new CartItem(product,quantity)]));
    }

  }


  getCartContent() : CartItem[] {

    let cart = JSON.parse(localStorage.getItem(this.cartName));
    if(cart) {
      return cart;
    } else {
      return [];
    }

  }


}
