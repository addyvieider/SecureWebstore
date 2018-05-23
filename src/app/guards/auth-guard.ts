import { Injectable }     from '@angular/core';
import { CanActivate, Router }    from '@angular/router';
import { AuthService }    from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canActivate() {

    console.log("AuthGuard called");

    let loggedIn = this.authService.loggedIn;
    if(!loggedIn) {
      this.router.navigate(['/login']);
    }

    return loggedIn;
  }
}