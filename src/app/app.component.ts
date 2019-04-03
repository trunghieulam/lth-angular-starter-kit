import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lth-angular-starter-kit';
  childsLoadDone:boolean = false;
  hasHeader: boolean = true;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit(){
    setTimeout(
      ()=> {
        this.childsLoadDone = true;
      }
    )
  }

  onActivate(event: any = {}) {
    this.hasHeader = event.hasHeader;
  }

  onDeactivate(event) {
    this.hasHeader = true;
  }
}
