import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isCollapsed: boolean = true;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
  }

  ngOnInit() {
  }

  login() {
    this.authenticationService.login();
  }

  logout() {
    this.authenticationService.logout().subscribe();
    this.handleUnauthenticatedUrl();
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
