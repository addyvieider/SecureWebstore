import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { subscribeOn } from 'rxjs/operator/subscribeOn';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  private username: string = "username";
  private admin: string = "admin";

  doRegister(email: string, username: string, password: string, name: string, surname: string) {

    this.http.post('/api/register', {
      email: email,
      username: username,
      password: password,
      name: name,
      surname: surname
    }).map((respone: any) => {

      console.log("Registered");
      return respone;

    }).catch(error => {

      console.log(error);
      return error;

    });

  }

  doLogin(username: string, password: string): Observable<any> {

    return this.http.post('/api/login', {
      username: username,
      password: password
    }, {
      withCredentials: true
    }).map((res: Response) => {
      console.log(res);
      if(res) {
        localStorage.setItem(this.username, res[this.username]);
        localStorage.setItem(this.admin, res[this.admin]);
      }
      return res;
    }).catch(error => {
      console.log(error);
      return error;
    });

  }

  logOut(): Observable<any> {

    return this.http.post('/api/logout', {},
    {
      withCredentials: true
    }).map((res: Response) => {
      console.log(res);
      localStorage.clear();
      
      return res;
    }).catch(err => {
      console.log(err);
      return err;
    });

  }

  get loggedIn(): boolean {
    return !!localStorage.getItem(this.username);
  }

}
