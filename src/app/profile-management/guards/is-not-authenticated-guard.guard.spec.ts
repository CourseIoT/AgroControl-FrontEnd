import {TestBed} from '@angular/core/testing';
import {CanActivateFn} from '@angular/router';

import {isNotAuthenticatedGuard} from './is-not-authenticated-guard.guard';

describe('isNotAuthenticatedGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => isNotAuthenticatedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
