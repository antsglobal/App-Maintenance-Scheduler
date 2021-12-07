import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DumperDetailsComponent } from './dumper-details.component';

describe('DumperDetailsComponent', () => {
  let component: DumperDetailsComponent;
  let fixture: ComponentFixture<DumperDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DumperDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DumperDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
