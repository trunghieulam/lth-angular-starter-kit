import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { ApiPrefixInterceptor } from './api-prefix.interceptor';
import { environment } from 'src/environments/environment';

describe('ApiPrefixInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiPrefixInterceptor,
          multi: true
        }
      ]
    });
  });

  beforeEach(inject([HttpClient, HttpTestingController], (_http: HttpClient, _httpMock: HttpTestingController) => {
    http = _http;
    httpMock = _httpMock;
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should prepend environment.serverUrl to the request url', () => {
    // Act
    http.get('/toto').subscribe();

    // Assert
    httpMock.expectOne({ url: environment.serverUrl + '/toto' });
  });

  it('should not prepend environment.serverUrl to request url', () => {
    // Act
    http.get('hTtPs://domain.com/toto').subscribe();

    // Assert
    httpMock.expectOne({ url: 'hTtPs://domain.com/toto' });
  });
});
