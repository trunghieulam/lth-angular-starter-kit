import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lth-angular-starter-kit';
  childsLoadDone:boolean = false;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit(){
    setTimeout(
      ()=> {
        this.childsLoadDone = true;
      }
    )
  }
}
