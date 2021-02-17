import { TestBed } from '@angular/core/testing';

import { EmployeeContributionService } from './employee-contribution.service';

describe('EmployeeContributionService', () => {
  let service: EmployeeContributionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeContributionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
