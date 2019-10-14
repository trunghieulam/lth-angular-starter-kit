import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { Toast, ToastrService } from 'ngx-toastr';

describe('ErrorHandlerInterceptor', () => {
  let errorHandlerInterceptor: ErrorHandlerInterceptor;
  let http: HttpClient;
  let httpMock: HttpTestingController;

  function createInterceptor() {
    const toast = new ToastrService(null, null, null, null, null);
    errorHandlerInterceptor = new ErrorHandlerInterceptor(toast);
    return errorHandlerInterceptor;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useFactory: createInterceptor,
          multi: true
        }
      ]
    });
  });

  beforeEach(inject([HttpClient, HttpTestingController], (clientHttp: HttpClient, testHttpMock: HttpTestingController) => {
    http = clientHttp;
    httpMock = testHttpMock;
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should catch error and call error handler', () => {
    // Arrange
    // Note: here we spy on private method since target is customization here,
    // but you should replace it by actual behavior in your app
    spyOn(ErrorHandlerInterceptor.prototype as any, 'errorHandler').and.callThrough();

    httpMock.expectOne({}).flush(null, {
      status: 404,
      statusText: 'error'
    });
  });
});
