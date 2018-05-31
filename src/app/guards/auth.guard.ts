import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    //console.log("AuthGuard called");

    let loggedIn = this.authService.getLoggedIn();
    loggedIn.then(res => {
      if(!res) {
        this.router.navigate(['/login']);
      }
    });

    return loggedIn;

  }
}
