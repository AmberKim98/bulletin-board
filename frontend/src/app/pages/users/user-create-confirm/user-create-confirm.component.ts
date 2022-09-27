import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-user-create-confirm',
  templateUrl: './user-create-confirm.component.html',
  styleUrls: ['./user-create-confirm.component.scss']
})
export class UserCreateConfirmComponent implements OnInit {
  userCreateData: any;
  loggedinUserData: any;
  currentUserId: any;
  currentUserRole: any;
  isEdit: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UsersService,
    private router: Router
  ) {
      this.activatedRoute.queryParams.subscribe(params => {
        if(params) {
          this.userCreateData = JSON.parse(params['data']);
          this.isEdit = params['fromPage'] === 'edit';
        }
      })
   }

  ngOnInit(): void {
    let data:any = localStorage.getItem('loggedinUser');
    this.currentUserId = JSON.parse(data).id;
    this.currentUserRole = JSON.parse(data).type;
  }

  confirm() {
    if(this.isEdit == true) {
      this.userService.updateUser(this.userCreateData).subscribe(data => {
        localStorage.setItem('updateComplete', 'true');
        localStorage.removeItem('updatedData');
        this.checkUserRole();
      })
    }
    else {
      this.userService.createUser(this.userCreateData).subscribe(data => {
        this.checkUserRole();
      })
    }

    localStorage.setItem('localUserDataExist', 'false');
    localStorage.setItem('storageExist', 'false');
    localStorage.setItem('changedPassword', 'false');
    localStorage.setItem('newPasswordData', 'false');
  }

  hidePassword(pwd: any) {
    return Array(pwd.length+1).join('*');
  }

  checkUserRole() {
    switch(this.currentUserRole) {
      case '1': this.router.navigate(['/users/detail/' + this.currentUserId]);break;
      case '0': this.router.navigate(['/users']);break;
    }
  }
}
