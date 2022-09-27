import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CustomValidators } from 'src/app/validations/confirmPassword.validator';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-user-create-update',
  templateUrl: './user-create-update.component.html',
  styleUrls: ['./user-create-update.component.scss']
})
export class UserCreateUpdateComponent implements OnInit {
  userCreateForm!: FormGroup;
  loggedinUserData: any;
  isEdit!: boolean;
  isDetail!: boolean;;
  isCreate!: boolean;
  basepath = '/users';
  currentPage: any;
  url: any;
  oldData: any;
  currentID: any;
  localUserDataExist:boolean = false;
  updateComplete = true;
  imagePath: any;

  constructor(
    private router: Router,
    private userService: UsersService,
    private activateRoute: ActivatedRoute
  ) { 
    this.activateRoute.params.subscribe(params => {
      if(params) {
        this.currentID = params['id'];
      }
    })
  }

  ngOnInit(): void {
    this.userCreateForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [
        Validators.required, 
        Validators.minLength(8), 
        Validators.pattern('(?=.*[A-Z])(?=.*[0-9]).*$')
      ]),
      'confirmPassword': new FormControl('', [Validators.required]),
      'type': new FormControl(''),
      'phone': new FormControl('', [Validators.required, Validators.pattern('[0-9]*$')]),
      'dob': new FormControl(''),
      'address': new FormControl(''),
      'profile': new FormControl('')
    }, [
      CustomValidators.MatchPasswordValidator('password', 'confirmPassword')
    ])

    this.checkURL();
    this.getLoggedinUserData();
  }

  get passwordMatchError() {
    return (
      this.userCreateForm.getError('unmatch') &&
      this.userCreateForm.get('confirmPassword')?.touched
    );
  }

  checkURL() {
    this.currentPage = this.router.url.startsWith(this.basepath + '/edit') ? 'edit' : (this.router.url.startsWith(this.basepath + '/detail') ? 'detail' : 'create' );
    switch(this.currentPage) {
      case 'edit': this.isEdit = true; this.checkOldData(); break;
      case 'detail': this.isDetail = true; this.checkOldData(); break;
      case 'create': this.isCreate = true; this.checkOldData(); break;
      default: break;
    }
  }

  checkOldData() {
    let data:any = localStorage.getItem('oldUserData');
    if(data != null) {
      this.oldData = JSON.parse(data);
      this.setOldDataValue();
    }
    else {
      if(!this.isCreate) {
        this.setFormValue();
      }
    }
  }

  setFormValue() {
    this.userService.getUserById(this.currentID).subscribe(data => {
      if(data != null) {
        this.oldData = data;
        this.userCreateForm.controls['name'].setValue(this.oldData.name);
        this.userCreateForm.controls['email'].setValue(this.oldData.email);
        this.userCreateForm.controls['password'].setValue(this.oldData.password);
        this.userCreateForm.controls['confirmPassword'].setValue(this.oldData.password);
        this.userCreateForm.controls['type'].setValue(this.oldData.type);
        this.userCreateForm.controls['phone'].setValue(this.oldData.phone);
        this.userCreateForm.controls['address'].setValue(this.oldData.address);
        this.userCreateForm.controls['dob'].setValue(new Date(this.oldData.dob));
        this.url = this.oldData.profile;
      }
    });
  }

  setOldDataValue() {
    this.userCreateForm.controls['name'].setValue(this.oldData.name);
    this.userCreateForm.controls['email'].setValue(this.oldData.email);
    this.userCreateForm.controls['password'].setValue(this.oldData.password);
    this.userCreateForm.controls['confirmPassword'].setValue(this.oldData.password);
    this.userCreateForm.controls['type'].setValue(this.oldData.type);
    this.userCreateForm.controls['phone'].setValue(this.oldData.phone);
    this.userCreateForm.controls['address'].setValue(this.oldData.address);
    this.userCreateForm.controls['dob'].setValue(new Date(this.oldData.dob));
    this.url = this.oldData.profile;
  }

  getLoggedinUserData() {
    let data:any = localStorage.getItem('loggedinUser');
    this.loggedinUserData = JSON.parse(data);
  }

  fileChange(event: any) {
    const profile_img = event.target.files[0].name;
    let element = document.getElementById('chosenFile') as HTMLElement;
    element.innerHTML = profile_img;

    const reader = new FileReader();
    reader.onload = (event: ProgressEvent) => {
      this.url = (<FileReader>event.target).result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  changeEditForm() {
    this.isEdit = true;
    this.isDetail = false;
    this.isCreate = false;
  }

  saveDraft() {
    let tempData = this.userCreateForm.value;
    tempData.profile = this.url
    localStorage.setItem('oldUserData', JSON.stringify(tempData));
  }

  gotoConfirm(data: any) {
    const changedPassword: any = localStorage.getItem('changedPassword') == 'true' ? true : false;
    if(changedPassword == true) {
      const pwdData:any = localStorage.getItem('newPasswordData');
      const newPwd:any = JSON.parse(pwdData);
      data.password = newPwd.new_pwd;
      data.confirmPassword = newPwd.confirm_pwd;
    }
    if(this.isCreate) {
      data.created_user_id = this.loggedinUserData.id;
      data.profile = this.url;
    }
    if(this.isEdit) {
      data.id = this.currentID;
      localStorage.setItem('updatedData', JSON.stringify(data));
    }
    data.profile = this.url;

    localStorage.setItem('oldUserData', JSON.stringify(data));

    const userData = JSON.stringify(data);
    const navigationExtras: NavigationExtras = {
      queryParams: {
        data: userData,
        fromPage: this.isEdit ? 'edit' : 'create'
      }
    }
    this.router.navigate(['/users/' + this.currentPage + '/confirm'], navigationExtras);
  }
}
