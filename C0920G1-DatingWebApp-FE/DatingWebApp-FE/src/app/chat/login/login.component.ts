import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as firebase from 'firebase';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  nickname = '';
  ref = firebase.database().ref('users/');
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    console.log(localStorage.getItem('nickname1'));
    if (localStorage.getItem('nickname1')) {
      this.router.navigate(['/roomlist']);
    }
    this.loginForm = this.formBuilder.group({
      'nickname1' : [null, Validators.required]
    });
  }

  onFormSubmit(form: any) {
    const login = form;
    this.ref.orderByChild('nickname1').equalTo(login.nickname1).once('value', snapshot => {
      if (snapshot.exists()) {
        localStorage.setItem('nickname1', login.nickname1);
        this.router.navigate(['/roomlist']);
      } else {
        const newUser = firebase.database().ref('users/').push();
        newUser.set(login);
        localStorage.setItem('nickname1', login.nickname1);
        this.router.navigate(['/roomlist']);
      }
    });
  }

}