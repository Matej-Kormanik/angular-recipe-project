import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit() {
  }

    onSignIn(form: NgForm) {
        console.log(form);
        const email = form.value.email;
        const password = form.value.password;
        this.authservice.signAnUserIn(email, password);
        // this.router.navigate(['/recipes']);
    }
}
