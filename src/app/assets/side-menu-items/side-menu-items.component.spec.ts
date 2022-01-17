import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuItemsComponent } from './side-menu-items.component';

describe('SideMenuItemsComponent', () => {
  let component: SideMenuItemsComponent;
  let fixture: ComponentFixture<SideMenuItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideMenuItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
