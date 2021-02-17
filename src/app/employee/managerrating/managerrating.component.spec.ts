import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerratingComponent } from './managerrating.component';

describe('ManagerratingComponent', () => {
  let component: ManagerratingComponent;
  let fixture: ComponentFixture<ManagerratingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerratingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerratingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
