import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostsService } from 'src/app/services/posts/posts.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  public id: number;
  public fromPage: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private postService: PostsService,
    private userService: UsersService
  ) { 
    this.id = data.id;
    this.fromPage = data.fromPage;
  }

  ngOnInit(): void {
  }

  delete() {
    switch(this.fromPage) {
      case 'post': this.deletePost();break;
      case 'user': this.deleteUser();break;
      default: break;
    }
  }

  deletePost() {
    this.postService.deletePost(this.id).subscribe(data => {
      window.location.reload();
    })
  }

  deleteUser() {
    this.userService.deleteUser(this.id).subscribe(data => {
      window.location.reload();
    })
  }
}
