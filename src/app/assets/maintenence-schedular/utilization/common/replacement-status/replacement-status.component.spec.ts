import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplacementStatusComponent } from './replacement-status.component';

describe('ReplacementStatusComponent', () => {
  let component: ReplacementStatusComponent;
  let fixture: ComponentFixture<ReplacementStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplacementStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplacementStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
