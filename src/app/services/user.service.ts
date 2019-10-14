import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInfo } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private implicitUserInfo: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>({
    displayName: '',
    email: '',
    phoneNumber: '',
    photoURL: '',
    providerId: '',
    uid: '',
  });
  public readonly userInfo: Observable<UserInfo> = this.implicitUserInfo.asObservable();

  constructor(
    public afAuth: AngularFireAuth
  ) {
  }

  updateUserInfo() {

    // you should use the service server database to get userinfo instead of using firbase userinfo
    this.afAuth.user.subscribe(
      user => {
        if (user) { this.implicitUserInfo.next(user); }
      }
    );
  }

  clearUserInfo() {
    this.implicitUserInfo.next(null);
  }
}
