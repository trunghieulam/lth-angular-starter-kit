import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Credentials } from 'src/app/model/credentials';
import { AccountKit, AuthResponse } from 'ng2-account-kit';
import { ToastrService } from 'ngx-toastr';

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

const credentialsKey = 'credentials';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
  private _credentials: Credentials | null;

  constructor(
    private clientService: HttpClient,
    private toastr: ToastrService,
  ) {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Authenticates the user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  login() {
    let formLogin = new FormData();
    AccountKit.login('PHONE', { countryCode: '+84', phoneNumber: '' }).then(
      (response: AuthResponse) => {
        formLogin.append('authCode', response.code);
        formLogin.append('password', '123456');
        // this.clientService.post('/auth/login', formLogin).pipe(
        //   map((response: any) => {
        //     this.setCredentials(response, true);
        //     this.toastr.success(`Welcome `, "Success Login");
        //     return response;
        //   })
        // ).subscribe();
      },
      () => {
        this.toastr.error("Please login to continue", "Login Error!");
      }
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredentials();
    return of(true);
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param {Credentials=} credentials The user credentials.
   * @param {boolean=} remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;
    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }
}
