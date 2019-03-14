import { Observable, of } from 'rxjs';

import { LoginContext } from './authentication.service';
import { Credentials } from 'src/app/model/credentials';

export class MockAuthenticationService {
  credentials: Credentials | null = {
    a: 'string',
    accessToken: '123',
    idToken: 'number',
    providerId: 'google.com',
    signInMethod: 'google.com'
  };

  login(context: LoginContext): Observable<Credentials> {
    return of({
      a: 'string',
      accessToken: '123',
      idToken: 'number',
      providerId: 'google.com',
      signInMethod: 'google.com'
    });
  }

  logout(): Observable<boolean> {
    this.credentials = null;
    return of(true);
  }

  isAuthenticated(): boolean {
    return !!this.credentials;
  }
}
