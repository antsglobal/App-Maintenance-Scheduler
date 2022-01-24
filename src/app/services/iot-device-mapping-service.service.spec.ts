import { TestBed } from '@angular/core/testing';

import { IotDeviceMappingServiceService } from './iot-device-mapping-service.service';

describe('IotDeviceMappingServiceService', () => {
  let service: IotDeviceMappingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IotDeviceMappingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
