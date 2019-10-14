import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'lth-angular-starter-kit';
  childsLoadDone = false;

  hasHeader = true;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    setTimeout(
      () => {
        this.childsLoadDone = true;
      }
    );
  }

  onActivate(event: any = {}) {
    console.log('Act', event);
    this.hasHeader = event.hasHeader;
  }

  onDeactivate(event) {
    console.log('Dec', event);
    this.hasHeader = true;
  }
}
