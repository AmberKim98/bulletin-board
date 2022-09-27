import { Component, OnInit, ViewChild } from '@angular/core';
import { PostsService } from 'src/app/services/posts/posts.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Post } from 'src/app/interface/post';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { formatDate } from '@angular/common';
import * as _ from 'lodash';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  displayedColumns = ['title', 'description', 'postedBy', 'postedDate', 'action'];
  posts: any;
  dataSource!: MatTableDataSource<Post>;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  loginUserData: any;
  searchKeyword: any;
  users: any;
  
  constructor(
    private postService: PostsService,
    public dialog: MatDialog,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(data => {
      this.posts = data;
      this.dataSource = new MatTableDataSource(this.posts);
    });
    
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    })

    this.loginUserData = localStorage.getItem('loggedinUser');
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 1000);
  }

  showConfirmDialog(id: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: id,
      fromPage: 'post'
    };
    dialogConfig.width = '300px';
    this.dialog.open(ConfirmDialogComponent, dialogConfig);
  }

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe(data => {
      window.location.reload();
    })
  }

  downloadPosts() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.posts);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data']};
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    FileSaver.saveAs(data, 'posts_' + formatDate(new Date(), 'YYYY_MM_dd_H:mm', 'en') + '.xlsx');
  }

  fileChange(event: any) {
    const dataFile = event.target.files[0];
    this.uploadPosts(dataFile);
  }

  uploadPosts(data: any) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      const arrayBuffer:any = fileReader.result;
      let data = new Uint8Array(arrayBuffer);
      let arr = new Array();
      for(var i=0; i<data.length; i++) {
        arr[i] = String.fromCharCode(data[i]);
      }
      let bstr = arr.join("");
      const workbook = XLSX.read(bstr, { type: 'binary' });
      let fileName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[fileName];
    }
    fileReader.readAsArrayBuffer(data);
  }

  searchPost() {
    const keyword = this.searchKeyword;
    
    const postedUserId = _.result(_.find(this.users, function(element) {
      return (element.name.trim().toLowerCase().includes(keyword.trim().toLowerCase()))
    }), 'id');

    const searchResult = _.filter(this.posts, function(element) {
      return (element.title.trim().toLowerCase().includes(keyword.trim().toLowerCase()) || 
      element.description.trim().toLowerCase().includes(keyword.trim().toLowerCase()) ||
      element.created_user_id === postedUserId);
    });

    this.dataSource.data = searchResult;
  }

  onKeyUp(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    if(input == '') {
      this.dataSource.data = this.posts;
    }
  }

  showPostedUser(id: any) {
    const usersData = this.users;
    return _.result(_.find(usersData, function(element) {
      return element.id == id;
    }), 'name')
  }
}
