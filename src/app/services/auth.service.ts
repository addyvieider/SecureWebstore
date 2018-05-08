import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  doRegister(email: string, username: string, password: string, name: string, surname: string) {

    this.http.post('/api/register', {
      email: email,
      username: username,
      password: password,
      name: name,
      surname: surname
    }).subscribe((respone: any) => {

      console.log("Registered");

    }, (errorRespone) => {

      console.log(errorRespone);

    });

  }

  doLogin(username: string, password: string) {

    return this.http.post('/api/login', {
      username: username,
      password: password
    }, {
      withCredentials: true
    });

  }

  getLogin() {
    this.http.get('/api/login', 
    {withCredentials: true
    }).subscribe((response: any) =>{

      return true;

    }, (errprRespone) => {

      return false;

    });
  }

}
