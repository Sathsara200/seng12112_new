import { TestBed } from '@angular/core/testing';

import { BaseUrlInterceptor } from './base-url-interceptor';

describe('BaseUrlInterceptor', () => {
  let service: BaseUrlInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseUrlInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
