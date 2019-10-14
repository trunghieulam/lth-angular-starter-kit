import { Injectable } from '@angular/core';
import { Credentials } from 'src/app/model/credentials';

const implicitCredentialsKey = 'implicitCredentialsKey';
const firebaseCredentialsKey = 'firebaseCredentialsKey';

@Injectable()
export class CredentialsService {

  // Service Server authen credentials
  private implicitCredentials: Credentials | null;

  constructor() {
  }

  getImplicitCredentialsFromStorage() {
    const savedCredentials = sessionStorage.getItem(implicitCredentialsKey) || localStorage.getItem(implicitCredentialsKey);
    if (savedCredentials) {
      this.implicitCredentials = JSON.parse(savedCredentials);
    }
  }

  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  setCredentials(credentials?: Credentials, remember?: boolean) {
    this.implicitCredentials = credentials || null;
    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(firebaseCredentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(firebaseCredentialsKey);
      localStorage.removeItem(firebaseCredentialsKey);
    }
  }

  clearAuthen() {
    this.setCredentials();
  }

  get credentials(): Credentials | null {
    return this.implicitCredentials;
  }
}
