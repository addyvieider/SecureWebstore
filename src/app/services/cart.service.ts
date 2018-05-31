import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
import { Observable } from 'rxjs';
import { CartItem } from './cartItem';
import { Router } from '@angular/router';

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

        if(itemInCart.product.id == product.id && itemInCart.packageType['name'] == packageType['name']) {
          alert(product.name + " (" + packageType['name'] + ") is already in the Cart");
          itemAlreadyInCart = true;
          break;
        } 
      }

      if(!itemAlreadyInCart) {
        cart.push(new CartItem(product, packageType, quantity));
        localStorage.setItem(this.cartName, JSON.stringify(cart));
        alert(product.name + " (" + packageType['name'] + ") has been added to the Cart");
      }
      
    } else {
      let cart = [new CartItem(product, packageType, quantity)];
      localStorage.setItem(this.cartName, JSON.stringify(cart));
      alert(product.name + " (" + packageType['name'] + ") has been added to the Cart");
    }

  }

  deleteFromCart(item: CartItem): CartItem[] {

    let cartJson = localStorage.getItem(this.cartName);
    
    if(cartJson) {
      let cart: CartItem[] = JSON.parse(cartJson);

      let newCart: CartItem[] = [];
      cart.forEach(cartItem => {
        if(cartItem.product.id != item.product.id || cartItem.packageType['name'] != item.packageType['name']) {
          newCart.push(cartItem);
        }
      })

      localStorage.setItem(this.cartName, JSON.stringify(newCart));
      return newCart;
    }

    return[];
  }


  getCartContent() : CartItem[] {

    let cart = JSON.parse(localStorage.getItem(this.cartName));
    if(cart) {
      return cart;
    } else {
      return [];
    }

  }

  clearCart() {

    localStorage.removeItem(this.cartName);

  }

  calcTotal(cartContent: CartItem[]): number{

    let total = 0;
    cartContent.forEach(item => {
      total += item.quantity * item.packageType['price'];
    });

    return total;

  }

}
