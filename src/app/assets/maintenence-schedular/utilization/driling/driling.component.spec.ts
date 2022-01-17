import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrilingComponent } from './driling.component';

describe('DrilingComponent', () => {
  let component: DrilingComponent;
  let fixture: ComponentFixture<DrilingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrilingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrilingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
