import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DumperStatusComponent } from './dumper-status.component';

describe('DumperStatusComponent', () => {
  let component: DumperStatusComponent;
  let fixture: ComponentFixture<DumperStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DumperStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DumperStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
