import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDurationComponent } from './trip-duration.component';

describe('TripDurationComponent', () => {
  let component: TripDurationComponent;
  let fixture: ComponentFixture<TripDurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripDurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
