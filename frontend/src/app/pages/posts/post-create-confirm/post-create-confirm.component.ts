import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-post-create-confirm',
  templateUrl: './post-create-confirm.component.html',
  styleUrls: ['./post-create-confirm.component.scss']
})
export class PostCreateConfirmComponent implements OnInit {
  postData: any;
  isEdit: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private postService: PostsService
  ) {
      this.activatedRoute.queryParams.subscribe(params => {
        if(params) {
          this.postData = JSON.parse(params['data']);
          this.isEdit = params['fromPage'] === 'edit';
        }
      })
   }

  ngOnInit(): void {
  }

  confirm() {
    if(this.isEdit == true) {
      this.postService.editPost(this.postData).subscribe(data => {
        this.router.navigate(['posts']);
      })
    }
    else {
      let data:any = localStorage.getItem('loggedinUser');
      const createdUser = JSON.parse(data).id;
      this.postData.created_user_id = createdUser;
      this.postService.createPost(this.postData).subscribe(data => {
        this.router.navigate(['posts']);
      })
    }
    
    localStorage.removeItem('oldPostData');
  }
}
