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
  private implicitCredentials: Credentials | null;

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this.implicitCredentials = JSON.parse(savedCredentials);
    } else {
      this.implicitCredentials = new Credentials();
    }

    const authorizationHeader = new HttpHeaders({
      Authorization: `Bearer ${this.implicitCredentials.accessToken}`
    });

    // Add Authorization Header
    request = request.clone({ headers: authorizationHeader });

    return next.handle(request);
  }
}
