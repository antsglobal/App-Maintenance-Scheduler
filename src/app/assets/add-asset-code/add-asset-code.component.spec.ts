import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssetCodeComponent } from './add-asset-code.component';

describe('AddAssetCodeComponent', () => {
  let component: AddAssetCodeComponent;
  let fixture: ComponentFixture<AddAssetCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAssetCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssetCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
