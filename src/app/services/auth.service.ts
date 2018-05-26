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

  doRegister(email: string, username: string, password: string, name: string, surname: string): Observable<any> {

    return this.http.post('/api/register', {
      email: email,
      username: username,
      password: password,
      name: name,
      surname: surname
    }).map((respone: any) => {

      console.log("Registered");
      return respone;

    });

  }

  doLogin(username: string, password: string): Observable<any> {

    return this.http.post('/api/login', {
      username: username,
      password: password
    }, {
      withCredentials: true
    }).map((res: Response) => {
      if(res) {
        localStorage.setItem(this.username, res[this.username]);
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
      localStorage.clear();
      console.log(err);
      return err;
    });

  }

  get loggedIn(): boolean {

    return !!localStorage.getItem(this.username);

  }

  async getLoggedIn(): Promise<boolean> {

    return await this.http.get('/api/login', {
      withCredentials: true
    }).map((res: Response) => {
      if(res) {

        return !!res;
      
      } else {
        
        if(!!localStorage.getItem(this.username)){
          alert("Invalid session");
          localStorage.clear();
        }

        return false;
      }
    }).toPromise();

  }

  async isAdmin(): Promise<boolean> {

    return await this.http.get('/api/admin', 
    {
      withCredentials: true
    }).map((res: Response) => {
      if(res) {
        return !!res;
      } else {
        return false;
      }
    }).toPromise();
  }

}
