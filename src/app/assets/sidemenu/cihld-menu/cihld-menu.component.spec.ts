import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CihldMenuComponent } from './cihld-menu.component';

describe('CihldMenuComponent', () => {
  let component: CihldMenuComponent;
  let fixture: ComponentFixture<CihldMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CihldMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CihldMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
