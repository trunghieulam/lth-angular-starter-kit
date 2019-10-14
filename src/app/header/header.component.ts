import { Component, OnInit } from '@angular/core';
import { AuthenticationService, LoginStatus } from '../core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserInfo } from 'firebase/app';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;
  userInfo: UserInfo;
  loginDialog: NgbModalRef;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal,
    private userService: UserService
  ) {
    this.userService.userInfo.subscribe(
      userInfo => this.userInfo = userInfo
    );
  }

  ngOnInit() {
  }

  login() {
    this.openLoginDialog();
  }

  logout() {
    this.authenticationService.logout().subscribe();
  }

  openLoginDialog() {
    const className = 'alert-login-modal';
    this.loginDialog = this.modalService.open(LoginDialogComponent, {
      windowClass: className,
      ariaLabelledBy: 'modal-basic-title',
      backdropClass: 'black-transparent-backdrop'
    });
    this.loginDialog.componentInstance.callLogin.subscribe(
      (response) => {
        if (response) {
          this.authenticationService.login().subscribe(
            (shouldClose: boolean) => {
              if (shouldClose) {
                this.loginDialog.close();
              } else {
                this.toastr.success('Login Failed!', 'Authentication');
              }
            }
          );
        } else {
          this.loginDialog.close();
        }
      }
    );
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
    return this.authenticationService.loginStatus !== LoginStatus.signout;
  }
}
