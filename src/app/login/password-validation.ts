import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

    static ConfirmPassword(ac: AbstractControl) {
       let password = ac.get('password').value;
       let confirmPassword = ac.get('confirmpassword').value;
        if(password != confirmPassword) {
            ac.get('confirmpassword').setErrors( {ConfirmPassword: true} )
        } else {
            return null
        }
    }
}