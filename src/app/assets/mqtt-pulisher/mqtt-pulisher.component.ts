import { Component, OnInit } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { publish } from 'rxjs/operators';
import { element } from 'protractor';
import { MqttServiceService } from '../../services/mqtt-service.service';

@Component({
  selector: 'app-mqtt-pulisher',
  templateUrl: './mqtt-pulisher.component.html',
  styleUrls: ['./mqtt-pulisher.component.css']
})
export class MqttPulisherComponent implements OnInit {

  devices: DeviceModel[] = [
    {
      "deviceId": "MQTTACDEV1",
      "deviceTopic": "devices/ac/dev1",
      "status": "ON",
    },
    {
      "deviceId": "MQTTACDEV2",
      "deviceTopic": "devices/ac/dev2",
      "status": "OFF"
    },
    {
      "deviceId": "MQTTACDEV3",
      "deviceTopic": "devices/ac/dev3",
      "status": "ON"
    }
  ];

  displayedColumns = ['deviceId', 'deviceTopic', 'status'];
  deviceData = new MatTableDataSource<DeviceModel>(this.devices);

  constructor(private mqttService: MqttServiceService) { }
  ngOnInit(): void {
    this.deviceData.data = this.devices;
  }

  getDeviceStatus(status) {
    let stat = (status == "ON") ? true : false
    return stat
  }

  updateDeviceInfo(element) {
    element.status = (element.status == "ON") ? "OFF" : "ON"
    this.publish(element);
  }

  publish(element) {
    console.log(element)
    this.mqttService.pusblisher(element).subscribe(data => {
      
    })
  }

}

export class DeviceModel {
  deviceId
  deviceTopic
  status
}