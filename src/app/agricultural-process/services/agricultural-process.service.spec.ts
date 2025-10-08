import {TestBed} from '@angular/core/testing';

import {AgriculturalProcessService} from './agricultural-process.service';

describe('AgriculturalProcessService', () => {
  let service: AgriculturalProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgriculturalProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
