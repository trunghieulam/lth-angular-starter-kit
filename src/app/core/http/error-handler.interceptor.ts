import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Logger } from '../logger.service';
import { ToastrService } from 'ngx-toastr';

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
  private errorHandler(response: any): Observable<HttpEvent<any>> {
    const { status } = response;
    if (status && status.toString() === '401') {
      this.toastr.error('Please login to continue', 'Login Error!');
    }
    throw response;
  }
}
