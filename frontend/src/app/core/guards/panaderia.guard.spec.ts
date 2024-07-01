import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { panaderiaGuard } from './panaderia.guard';

describe('panaderiaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => panaderiaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
