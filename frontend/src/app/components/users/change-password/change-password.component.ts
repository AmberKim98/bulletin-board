import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'src/app/validations/confirmPassword.validator';
import { UsersService } from 'src/app/services/users/users.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  userID: any;
  currentPwd: any;
  pwdChangeForm!: FormGroup;
  oldPwdUnmatch = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UsersService,
    private location: Location
  ) {
    this.activatedRoute.params.subscribe(param => {
      if(param) {
        this.userID = param['id'];
        
        this.getUserData();
      }
    })
   }

  ngOnInit(): void {
    this.pwdChangeForm = new FormGroup({
      old_pwd: new FormControl('', [Validators.required]),
      new_pwd: new FormControl('', [
        Validators.required,
        Validators.minLength(8), 
        Validators.pattern('(?=.*[A-Z])(?=.*[0-9]).*$')
      ]),
      confirm_pwd: new FormControl('', [Validators.required])
    }, [
      CustomValidators.MatchPasswordValidator('new_pwd', 'confirm_pwd')
    ])
  }

  getUserData() {
    this.userService.getUserById(this.userID).subscribe(data => {
      this.currentPwd = data.password;
    })
  }

  changeNewPwd(data: any) {
    const checkOldPassword = this.currentPwd === data.old_pwd;
    if(checkOldPassword != false) {
      this.oldPwdUnmatch = false;
      localStorage.setItem('changedPassword', 'true');
      localStorage.setItem('newPasswordData', JSON.stringify(data));
      this.location.back();
    }
    else {
      this.pwdChangeForm.setErrors({'currentPwdUnmatch': true});
    }
  }
}
