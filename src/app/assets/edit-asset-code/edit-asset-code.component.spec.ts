import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssetCodeComponent } from './edit-asset-code.component';

describe('EditAssetCodeComponent', () => {
  let component: EditAssetCodeComponent;
  let fixture: ComponentFixture<EditAssetCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAssetCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssetCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
