import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../services/checkout.service';
import { AuthService } from '../services/auth.service';
import { Order } from '../services/order';
import { User } from '../services/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [CheckoutService, AuthService],
})
export class AdminComponent implements OnInit {

  constructor(private checkoutService: CheckoutService, private authService: AuthService) { }

  orders: Order[] = [];
  users: User[] = [];
  selectedUser: User;

  ngOnInit() {

    this.checkoutService.getAllOrders().subscribe(res => {

      this.orders = res;

    }, err => {
      //console.log(err);
    });

    this.authService.getUsers().subscribe(res => {

      this.users = res;
      //console.log(res);

    }, err => {
      //console.log(err);
    });

  }

  editUser(user: User) {
    //console.log(user);
    this.selectedUser = user;
  }

  saveUser(user: User) {

    this.authService.saveUser(user).subscribe(res => {

      if(res) {
        this.selectedUser = null;
      } else {
        alert("Something went wrong");
      }

    }, err => {
      //console.log(err);
    })

  }

}
