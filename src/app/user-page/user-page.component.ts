import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CheckoutService } from '../services/checkout.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
  providers: [AuthService, CheckoutService]
})
export class UserPageComponent implements OnInit {

  constructor(private authService: AuthService, private checkoutService: CheckoutService, private router: Router) { }

  private orders = [];

  ngOnInit() {
    this.checkoutService.getOrders().subscribe(res => {
      this.orders = JSON.parse(res);
    }, err => {
      console.log(err);
    })
  }

  logout() {

    console.log("logout");
    this.authService.logOut().subscribe(() => {
      this.router.navigate(['shop']);
    }, error => {
      this.router.navigate(['login']);
      console.log(error);
    });
  }

}
