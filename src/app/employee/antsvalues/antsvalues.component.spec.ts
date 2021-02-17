import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntsvaluesComponent } from './antsvalues.component';

describe('AntsvaluesComponent', () => {
  let component: AntsvaluesComponent;
  let fixture: ComponentFixture<AntsvaluesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntsvaluesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AntsvaluesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
