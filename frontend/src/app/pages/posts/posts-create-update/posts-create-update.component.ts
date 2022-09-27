import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-posts-create-update',
  templateUrl: './posts-create-update.component.html',
  styleUrls: ['./posts-create-update.component.scss']
})
export class PostsCreateUpdateComponent implements OnInit {
  postCreateForm!: FormGroup;
  postId: any;
  postData: any;
  currentPage: any;
  isEdit!: boolean;
  isDetail!: boolean;;
  isCreate!: boolean;
  basepath = '/posts';
  oldData: any;

  constructor(
    private router: Router,
    private postService: PostsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(params => {
      if(params) {
        this.postId = params['id'];
      }
    })
   }

  ngOnInit(): void {
    this.postCreateForm = new FormGroup({
      'title': new FormControl('', [Validators.required, Validators.maxLength(255)]),
      'description': new FormControl('', [Validators.required]),
      'status': new FormControl(''),
    });

    this.checkURL();
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
    let data:any = localStorage.getItem('oldPostData');
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
    this.postService.getPostById(this.postId).subscribe(data => {
      if(data != null) {
        this.oldData = data;
        
        this.postCreateForm.controls['title'].setValue(this.oldData.title);
        this.postCreateForm.controls['description'].setValue(this.oldData.description);
        this.postCreateForm.controls['status'].setValue(this.oldData.status);
      }
    })
  }

  setOldDataValue() {
    this.postCreateForm.controls['title'].setValue(this.oldData.title);
    this.postCreateForm.controls['description'].setValue(this.oldData.description);
    this.postCreateForm.controls['status'].setValue(this.oldData.status);
  }

  gotoConfirm(data: any) {
    const postData = data;
    postData.id = this.postId;
    postData.status = this.postCreateForm.controls['status'].value == true ? 1 : 0;
   
    localStorage.setItem('oldPostData', JSON.stringify(postData));

    const navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(postData),
        fromPage: this.isEdit ? 'edit' : 'create'
      }
    }
    this.router.navigate(['/posts/' + this.currentPage + '/confirm'], navigationExtras);
  }

  changeEditForm() {
    this.isEdit = true;
    this.isDetail = false;
    this.isCreate = false;
  }
}
