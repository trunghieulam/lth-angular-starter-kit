import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Credentials } from 'src/app/model/credentials';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Logger } from '../logger.service';

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

const credentialsKey = 'credentials';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
  private _credentials: auth.OAuthCredential | Credentials | null;

  constructor(
    private toastr: ToastrService,
    public afAuth: AngularFireAuth
  ) {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
      this.afAuth.auth.signInAndRetrieveDataWithCredential(auth.GoogleAuthProvider.credential(
        this._credentials.idToken,
        this._credentials.accessToken
      )).then(
        () => {
        }, reason => {
          log.debug(reason);
          this.setCredentials();
        }
      );
    }
  }

  /**
   * Authenticates the user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(
      result => {
        this.toastr.success("Login success!", "Authentication");
        this.setCredentials(result.credential, true);
      }, reason => {
        log.debug(reason);
      }
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    this.afAuth.auth.signOut();
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
  get credentials(): Credentials | auth.AuthCredential | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param {Credentials=} credentials The user credentials.
   * @param {boolean=} remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: Credentials | auth.AuthCredential, remember?: boolean) {
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
