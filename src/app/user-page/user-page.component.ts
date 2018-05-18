import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
  providers: [AuthService]
})
export class UserPageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logout() {

    console.log("logout");
    this.authService.logOut().subscribe(() => {
      this.router.navigate(['shop']);
    }, error => {
      console.log(error);
    });
  }

}
