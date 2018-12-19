import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    @ViewChild('form') myForm: NgForm;
    @ViewChild('pwd1') pwd1: NgModel;
    @ViewChild('pwd2') pwd2: NgModel;
    passwordsEqual = false;


    constructor(private authService: AuthService) {
    }

    ngOnInit() {

    }

    onSignUp(form: NgForm) {
        console.log(form);
        const email = form.value.email;
        const password = form.value.password;
        this.authService.signAnUserUp(email, password);
    }

    checkPasswords() {
        this.passwordsEqual = this.pwd1.value === this.pwd2.value;
    }
}
