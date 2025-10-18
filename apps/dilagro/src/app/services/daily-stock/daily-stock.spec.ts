import { TestBed } from '@angular/core/testing';

import { DailyStock } from './daily-stock';

describe('DailyStock', () => {
  let service: DailyStock;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyStock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
