import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faGooglePlusSquare } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  faGoogle = faGooglePlusSquare;
  @Output() callLogin = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  login() {
    this.callLogin.emit(true);
  }

  close() {
    this.callLogin.emit(false);
  }

}
