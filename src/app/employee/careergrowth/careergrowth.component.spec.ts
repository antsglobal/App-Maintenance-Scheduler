import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareergrowthComponent } from './careergrowth.component';

describe('CareergrowthComponent', () => {
  let component: CareergrowthComponent;
  let fixture: ComponentFixture<CareergrowthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareergrowthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareergrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
