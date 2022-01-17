import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IotDeviceMappingComponent } from './iot-device-mapping.component';

describe('IotDeviceMappingComponent', () => {
  let component: IotDeviceMappingComponent;
  let fixture: ComponentFixture<IotDeviceMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IotDeviceMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IotDeviceMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
