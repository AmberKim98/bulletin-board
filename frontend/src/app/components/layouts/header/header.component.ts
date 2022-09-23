import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loginData: any;
  userType: any;
  userName: any;
  isUserLoggedIn: any;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    let data: any;
    data = localStorage.getItem('loggedinUser');
    this.loginData = JSON.parse(data);
    this.userName = this.loginData.name;
    this.userType = this.loginData.type;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
