import {TestBed} from '@angular/core/testing';

import {ProductStoredService} from './product-stored.service';

describe('ProductStoredService', () => {
  let service: ProductStoredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductStoredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
