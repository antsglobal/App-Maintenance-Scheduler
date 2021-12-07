import { TestBed } from '@angular/core/testing';

import { HrmanagerGuard } from './hrmanager.guard';

describe('HrmanagerGuard', () => {
  let guard: HrmanagerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HrmanagerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
