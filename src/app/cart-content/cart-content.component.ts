import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItem } from '../services/cartItem';
import { CheckoutService } from '../services/checkout.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cart-content',
  templateUrl: './cart-content.component.html',
  styleUrls: ['./cart-content.component.css'],
  providers: [CartService, AuthService]
})
export class CartContentComponent implements OnInit {

  cartContent : CartItem[]; 

  constructor(private cartService: CartService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.cartContent = this.cartService.getCartContent();
    //console.log(this.cartContent);
  }

  deleteFromCart(item: CartItem) {
    this.cartContent = this.cartService.deleteFromCart(item);
  }

  calcTotal(): number{

    return this.cartService.calcTotal(this.cartContent);

  }

  checkout() {
    if(this.cartContent.length > 0) {
      this.router.navigate(["/checkout"]);
    }
  }

  canCheckout() {
    return this.cartContent.length > 0 && this.authService.loggedIn;
  }

}
