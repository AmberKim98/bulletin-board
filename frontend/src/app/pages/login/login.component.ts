import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokensService } from 'src/app/services/tokens/tokens.service';
import * as _ from 'lodash';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  usersData: any;
  incorrectUser = false;
  showLoading = false;
  email!: string;
  password!: string;
  rememberMe = false;
  isLogin = false;
  currentUser: any;

  constructor(
    private router: Router,
    private userService: UsersService,
    private authService: AuthService,
    private tokenService: TokensService,
    private cdref: ChangeDetectorRef
  ) { 
      this.isLogin = localStorage.getItem('isUserLoggedIn') == 'true' ? true : false;
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email' : new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required]),
      'remember': new FormControl('')
    })

    this.userService.getAllUsers().subscribe(data => {
      if(data != null) {
        this.usersData = data;
      }
    });

    if(this.isLogin) {
      let data:any = localStorage.getItem('loggedinUser');
      this.currentUser = JSON.parse(data);
      this.loginForm.controls['email'].setValue(this.currentUser.email);
      this.loginForm.controls['remember'].setValue(true);
    }
  }

  checkUser(data: any) {
    this.showLoading = true;
    this.email = data.email;
    this.password = data.password;
    this.authService.login(this.email, this.password, this.usersData, this.rememberMe).subscribe(data => {
      this.showLoading = false;
      if(data == false) {
        this.incorrectUser = true;
      }
      else {
        this.incorrectUser = false;
        this.router.navigate(['posts']);
      }
    })
  }
}
