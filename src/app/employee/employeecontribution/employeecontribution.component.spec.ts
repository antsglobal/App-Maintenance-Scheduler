import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeecontributionComponent } from './employeecontribution.component';

describe('EmployeecontributionComponent', () => {
  let component: EmployeecontributionComponent;
  let fixture: ComponentFixture<EmployeecontributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeecontributionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeecontributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
