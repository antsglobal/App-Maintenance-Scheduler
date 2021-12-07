import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MqttPulisherComponent } from './mqtt-pulisher.component';

describe('MqttPulisherComponent', () => {
  let component: MqttPulisherComponent;
  let fixture: ComponentFixture<MqttPulisherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MqttPulisherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MqttPulisherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
