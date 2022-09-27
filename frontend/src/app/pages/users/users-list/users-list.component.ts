import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/interface/user';
import { UsersService } from 'src/app/services/users/users.service';
import * as _ from 'lodash';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  displayedColumns = ['name', 'email', 'createdUser', 'phone', 'dob', 'address', 'createdDate', 'updatedDate', 'action'];
  dataSource!: MatTableDataSource<User>;
  users: any;
  searchName: any; 
  searchEmail: any;
  searchCreatedFrom: any;
  searchCreatedTo: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UsersService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
      this.dataSource = new MatTableDataSource(this.users);
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    },1000);
  }

  findUsername(id: number) {
    let username = _.result(_.find(this.users, function(element) {
      return element.id === Number(id)
    }), 'name');
    return username;
  }

  showConfirmDialog(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: id,
      fromPage: 'user'
    };
    dialogConfig.width = '300px';
    this.dialog.open(ConfirmDialogComponent, dialogConfig);
  }

  searchUser() {
    let name = this.searchName;
    let email = this.searchEmail;
    let createdFrom = this.searchCreatedFrom;
    let createdTo = this.searchCreatedTo;
    let empty = false;

    let searchResult = [];
    let result: any;
    if(name) {
      result = _.filter(this.users, function(element) {
        return element.name.trim().toLowerCase().includes(name.trim().toLowerCase());
      });
      for(var j=0; j<result.length; j++) {
        searchResult.push(result[j]);
      }
    }

    if(email) {
      result = _.filter(this.users, function(element) {
        return element.email.trim().toLowerCase().includes(email.trim().toLowerCase());
      });
      for(var j=0; j<result.length; j++) {
        searchResult.push(result[j]);
      }
    }

    if(createdFrom) {
      if(createdTo) {
        result = _.filter(this.users, function(element) {
          return formatDate(element.created_at, 'YYYY/MM/dd', 'en') >= formatDate(createdFrom, 'YYYY/MM/dd', 'en') && formatDate(element.created_at, 'YYYY/MM/dd', 'en') <= formatDate(createdTo, 'YYYY/MM/dd', 'en')
        });
      }
      else {
        result = _.filter(this.users, function(element) {
          return formatDate(element.created_at, 'YYYY/MM/dd', 'en') >= formatDate(createdFrom, 'YYYY/MM/dd', 'en') && formatDate(element.created_at, 'YYYY/MM/dd', 'en') <= formatDate(new Date(), 'YYYY/MM/dd', 'en')
        });
      }
      for(var i=0; i<result.length; i++) {
        searchResult.push(result[i]);
      }
    }

    const emptyCheck = this.checkEmpty(name, email, createdFrom, createdTo);

    if(emptyCheck) {
      this.dataSource.data = this.users;
    }
    else {
      this.dataSource.data = _.uniq(searchResult);
    }
  }

  checkEmpty(name: any, email: any, createdFrom: any, createdTo: any) {
    let isNameEmpty, isEmailEmpty, isCreatedFromEmpty, isCreatedToEmpty;

    if(name == undefined || name == null || name == '') {
      isNameEmpty = true;
    }
    if(email == undefined || email == null || email == '') {
      isEmailEmpty = true;
    }
    if(createdFrom == undefined || createdFrom == null || createdFrom == '') {
      isCreatedFromEmpty = true;
    }
    if(createdTo == undefined || createdTo == null || createdTo == '') {
      isCreatedToEmpty = true;
    }

    if(isNameEmpty && isEmailEmpty && isCreatedFromEmpty && isCreatedToEmpty) {
      return true;
    }
    else return false;
  }

  onKeyUp(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    if(input == '') {
      this.dataSource.data = this.users;
    }
  }
}
