import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { PostsService } from 'src/app/services/posts/posts.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-upload-csv',
  templateUrl: './upload-csv.component.html',
  styleUrls: ['./upload-csv.component.scss']
})
export class UploadCSVComponent implements OnInit {
  postData: any;
  fileSizeError: any;
  valid = false;
  csvFieldValid = true;
  currentUserId: any;

  constructor(
    private postService: PostsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let data: any = localStorage.getItem('loggedinUser');
    this.currentUserId = JSON.parse(data).id;
  }

  fileChange(event: any) {
    const inputFile = event.target.files[0];
    const fileSize = inputFile.size/1024/1024;

    if(fileSize > 2) {
      this.fileSizeError = true;
    }
    else {
      this.fileSizeError = false;
      this.valid = true;
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
        this.postData = XLSX.utils.sheet_to_json(worksheet);
        this.csvFieldValid = this.checkCSV(this.postData);
      }
      fileReader.readAsArrayBuffer(inputFile);
    }
  }

  uploadPosts() {
    if(this.csvFieldValid == true) {
      this.csvFieldValid = true;
      for(var i=0; i<this.postData.length; i++) {
        this.postData[i].created_user_id = this.currentUserId;
        this.postService.createPost(this.postData[i]).subscribe(data => {
          this.router.navigate(['posts']);
        })
      }
    }
    else {
      this.csvFieldValid = false;
    }

  }

  checkCSV(data: any) {
    let headers: any, valid: any;
    for(var i=0; i<data.length; i++) {
      headers = Object.keys(data[i]);
      if(_.includes(headers, 'title') && _.includes(headers, 'description')) {
        valid = true;
      }
      else valid = false;
    }
    return valid;
  }
}
