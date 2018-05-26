import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../services/checkout.service';
import { CartService } from '../services/cart.service';
import { CartItem } from '../services/cartItem';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [CheckoutService, CartService]
})
export class CheckoutComponent implements OnInit {

  constructor(private checkoutService: CheckoutService, private cartService: CartService) { }

  private cartContent : CartItem[]; 
  private checkoutForm: FormGroup;

  ngOnInit() {
    this.cartContent = this.cartService.getCartContent();

    this.checkoutForm = new FormGroup({
      zip: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      firstname: new FormControl('', [
        Validators.required
      ]),
      secondname: new FormControl('', [
        Validators.required
      ])
    });
  }

  calcTotal(): number{

    return this.cartService.calcTotal(this.cartContent);

  }

  checkout() {

    if(this.checkoutForm.valid) {

      let name: string = this.checkoutForm.controls.firstname.value + " " + this.checkoutForm.controls.secondname.value;
      let address: string =  this.checkoutForm.controls.zip.value + " " +  this.checkoutForm.controls.city.value + " " +  this.checkoutForm.controls.address.value;

      this.checkoutService.checkout(name, address);

    }

  }

}
