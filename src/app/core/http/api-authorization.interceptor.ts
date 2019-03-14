import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credentials } from 'src/app/model/credentials';

const credentialsKey = 'credentials';

/**
 * Prefixes all requests with `environment.serverUrl`.
 */
@Injectable()
export class ApiAuthorizationInterceptor implements HttpInterceptor {
  private _credentials: Credentials | null;

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    } else {
      this._credentials = new Credentials();
    }

    let authorizationHeader = new HttpHeaders({
      Authorization: `Bearer ${this._credentials.token}`
    });

    // Add Authorization Header
    request = request.clone({ headers: authorizationHeader });

    return next.handle(request);
  }
}
