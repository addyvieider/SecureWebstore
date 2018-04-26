import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { PasswordValidation } from './password-validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;
  passwordGroup: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.passwordGroup = new FormGroup({
      password: new FormControl('', Validators.required),
      confirmpassword: new FormControl('', [
        Validators.required
      ])
    }, PasswordValidation.ConfirmPassword);

    this.registerForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("[^ @]*@([^ @\.]+\.[^ @\.]+)+")
      ]),
      username: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      passwordGroup: this.passwordGroup
    });


  }

  login() {

    if(this.loginForm.valid) {

      this.authService.doLogin(this.loginForm.value.username, this.loginForm.value.password);


    }

  }

  register() {

    if(this.registerForm.valid) {

      this.authService.doRegister(this.registerForm.value.email, this.registerForm.value.username, 
        this.registerForm.value.password, this.registerForm.value.name, this.registerForm.value.surname);

    }

  }

}
