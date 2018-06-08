import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { PasswordValidation } from './password-validation';
import { Router } from '@angular/router';

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

  badLogin: boolean = false;
  userExistend: boolean = false;

  @Output()
  private loginEvent: EventEmitter<any> = new EventEmitter();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.passwordGroup = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
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

      this.authService.doLogin(this.loginForm.value.username, this.loginForm.value.password).subscribe(
        response => {
          if(response) {
            //console.log("Logged in");

            this.loginEvent.emit();
            this.router.navigate(['shop']);
          } else {
            this.badLogin = true;
          }
        },
        error => {
          //console.log(error);         
        }
      )

    } else {

      for(let control in this.loginForm.controls) {
        this.loginForm.controls[control].markAsTouched()
      }

    }

  }

  register() {

    if(this.registerForm.valid) {

      this.authService.doRegister(this.registerForm.value.email, this.registerForm.value.username, 
        this.passwordGroup.value.password, this.registerForm.value.name, this.registerForm.value.surname).subscribe(
          response => {
            this.registerForm.reset();
            this.userExistend = false;
            alert("Registered");
          }, err => {
            if(err.status == 409) {
              this.userExistend = true;
            }
          });;

    } else {
      
      for(let control in this.registerForm.controls) {
        this.registerForm.controls[control].markAsTouched()
      }

      for(let control in this.passwordGroup.controls) {
        this.passwordGroup.controls[control].markAsTouched()
      }

    }

  }

}
