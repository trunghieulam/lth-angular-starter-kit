import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInfo } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userInfo: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>({
    displayName: '',
    email: '',
    phoneNumber: '',
    photoURL: '',
    providerId: '',
    uid: '',
  });
  public readonly userInfo: Observable<UserInfo> = this._userInfo.asObservable();

  constructor(
    public afAuth: AngularFireAuth
  ) {
    this.afAuth.user.subscribe(
      user => {
        if (user) this._userInfo.next(user);
      }
    )
  }
}
