import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of, Subscription, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Logger } from '../logger.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { CredentialsService } from './credentials.service';

const log = new Logger('AuthenticationService');

export interface AccessToken {
  token: any;
  expired: any;
}

export interface RefreshToken {
  token: any;
  expired: any;
}

export interface LoginContext {
  authCode: string;
  password: string;
}

export const LoginStatus = {
  verifying: 'verifying',
  signed: 'signed',
  signout: 'signout',
  refreshing: 'refreshing',
};

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService implements OnDestroy {
  idToken = '';
  listSubscription: Subscription[] = [];

  // verifying, signed, signout, refreshing
  loginStatus: string;

  constructor(
    private toastr: ToastrService,
    public afAuth: AngularFireAuth,
    // private httpService: HttpClient,
    private userService: UserService,
    private credentialsService: CredentialsService
  ) {

    // first is load the credentials from storage to credentialsService instances
    this.credentialsService.getImplicitCredentialsFromStorage();

    this.loginStatus = LoginStatus.refreshing;
    this.verifyAuthen().subscribe(
      (result: boolean) => {
        if (result) {
          this.loginStatus = LoginStatus.signed;
          this.updateUserProfile();
        } else {
          this.loginStatus = LoginStatus.signout;
        }
      }
    );
  }

  verifyAuthen(): Observable<boolean> {
    // call httpClient for verifying Service Server Credentials, by pass to return true
    let hasStorageCredentials = false;
    if (this.credentialsService.credentials) {
      hasStorageCredentials = true;
    }
    return of(hasStorageCredentials);
  }

  updateUserProfile() {
    this.userService.updateUserInfo();
  }

  login(): Observable<boolean> {
    return from(this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(
      result => {
        this.toastr.success('Login success!', 'Authentication');
        if (result && result.credential) {
          this.loginStatus = LoginStatus.signed;
          this.getAuthenAndProfile();
        } else {
          // result have invalid credentials
          this.loginStatus = LoginStatus.signout;
          this.afAuth.auth.signOut();
        }
        return true;
      }, reason => {
        log.debug(reason);
        this.loginStatus = LoginStatus.signout;
        return false;
      }
    ));
  }

  getAuthenAndProfile() {
    this.callServiceServerAuthAPI().subscribe(
      (result: boolean) => {
        if (result) {
          this.userService.updateUserInfo();
        }
      }
    );
  }

  callServiceServerAuthAPI(): Observable<boolean> {
    // use httpClient for calling Service Server Authen API, by pass to return true
    return of(true);
  }

  ngOnDestroy() {
    this.clearSubscriptions();
  }

  clearSubscriptions() {
    this.listSubscription.map(
      subscription => {
        subscription.unsubscribe();
      }
    );
  }

  logout(): Observable<boolean> {
    this.loginStatus = LoginStatus.signout;

    this.afAuth.auth.signOut();
    // Customize credentials invalidation here
    this.userService.clearUserInfo();
    this.credentialsService.setCredentials();
    return of(true);
  }

  isAuthenticated(): boolean {
    return !!this.credentialsService.credentials;
  }
}
