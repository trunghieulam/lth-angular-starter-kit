import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserInfo } from 'firebase/app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isCollapsed: boolean = true;
  userInfo: UserInfo;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.userService.userInfo.subscribe(
      userInfo => this.userInfo = userInfo
    );
  }

  ngOnInit() {
  }

  login() {
    this.authenticationService.login();
  }

  logout() {
    this.authenticationService.logout().subscribe();
    // this.handleUnauthenticatedUrl();
  }

  handleUnauthenticatedUrl() {
    location.reload();
  }

  handleNavigateByUrl(url: string, needAuthen: boolean = false) {
    if (needAuthen) {
      if (!this.isLoged) {
        this.login();
      }
    }
    this.router.navigateByUrl(url);
    this.isCollapsed = true;
  }

  get isLoged() {
    return this.authenticationService.isAuthenticated();
  }
}
