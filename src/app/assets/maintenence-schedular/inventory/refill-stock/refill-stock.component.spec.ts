import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefillStockComponent } from './refill-stock.component';

describe('RefillStockComponent', () => {
  let component: RefillStockComponent;
  let fixture: ComponentFixture<RefillStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefillStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefillStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
