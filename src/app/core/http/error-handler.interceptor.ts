import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Logger } from '../logger.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

const log = new Logger('ErrorHandlerInterceptor');

/**
 * Adds a default error handler to all requests.
 */
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private toastr: ToastrService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(error => this.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {
    if (!environment.production) {
      // Do something with the error
      log.error('Request error', response);
      if (response['status'].toString() === '401') {
        this.toastr.error("Please login to continue", "Login Error!");
      }
    }
    throw response;
  }
}
