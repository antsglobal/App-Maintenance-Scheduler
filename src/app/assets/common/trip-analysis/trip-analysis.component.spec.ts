import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripAnalysisComponent } from './trip-analysis.component';

describe('TripAnalysisComponent', () => {
  let component: TripAnalysisComponent;
  let fixture: ComponentFixture<TripAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
