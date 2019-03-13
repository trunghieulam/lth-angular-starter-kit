import { Observable, of } from 'rxjs';

import { LoginContext } from './authentication.service';
import { Credentials } from 'src/app/model/credentials';

export class MockAuthenticationService {
  credentials: Credentials | null = {
    expire: 'test',
    token: '123',
    countryPrefix: '',
    isNew: true,
    id: 1,
    phone: ''
  };

  login(context: LoginContext): Observable<Credentials> {
    return of({
      expire: 'test',
      token: '123',
      countryPrefix: '',
      isNew: true,
      id: 1,
      phone: ''
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
