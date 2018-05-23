import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItem } from '../services/cartItem';

@Component({
  selector: 'app-cart-content',
  templateUrl: './cart-content.component.html',
  styleUrls: ['./cart-content.component.css'],
  providers: [CartService]
})
export class CartContentComponent implements OnInit {

  private cartContent : CartItem[]; 

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartContent = this.cartService.getCartContent();
    console.log(this.cartContent);
  }

  deleteFromCart(item: CartItem) {
    this.cartContent = this.cartService.deleteFromCart(item);
  }

  calcTotal(): number{

    let total = 0;
    this.cartContent.forEach(item => {
      total += item.quantity * item.packageType['price'];
    });

    return total;

  }

}
