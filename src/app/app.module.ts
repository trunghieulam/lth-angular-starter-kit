import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core';
import { ToastrModule } from 'ngx-toastr';
import { LoginDialogComponent } from './header/login-dialog/login-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginDialogComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    CoreModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  entryComponents: [
    LoginDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
