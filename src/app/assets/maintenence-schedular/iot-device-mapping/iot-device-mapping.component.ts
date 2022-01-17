import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { IotDeviceComponent } from './iot-device/iot-device.component';

@Component({
  selector: 'app-iot-device-mapping',
  templateUrl: './iot-device-mapping.component.html',
  styleUrls: ['./iot-device-mapping.component.css']
})
export class IotDeviceMappingComponent implements OnInit {

  pageTitle = 'IoT Device Mapping';
  status = true;
  devices: IoTDevice[] = []

  deviceData = new MatTableDataSource<IoTDevice>(this.devices);
  displayedColumns = [
    'id',
    'deviceSensorId',
    'deviceName',
    'modelName',
    'deviceType',
    'status',
    'actions'
  ];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.devices = [
      {
        'id': 1,
        'deviceSensorId': '123sd123',
        'deviceName': 'Device_1',
        'modelName': 'PC200',
        'deviceType': 'Loader',
        'status': 1,
      },
      {
        'id': 2,
        'deviceSensorId': '123sd123',
        'deviceName': 'Device_2',
        'modelName': 'PC200',
        'deviceType': 'Loader',
        'status': 1,
      },
      {
        'id': 3,
        'deviceSensorId': '123sd123',
        'deviceName': 'Device_3',
        'modelName': 'PC300',
        'deviceType': 'Driller',
        'status': 0,
      },
      {
        'id': 4,
        'deviceSensorId': '123sd123',
        'deviceName': 'Device_4',
        'modelName': 'PC300',
        'deviceType': 'Driller',
        'status': 1,
      }
    ]

    this.deviceData.data = this.devices;
    this.onStatusChange()
  }

  ngAfterViewInit() {
    this.deviceData.paginator = this.paginator;
    this.deviceData.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.deviceData.filter = filterValue;
  }

  onStatusChange() {
    this.filterAssetData(this.status);
  }

  filterAssetData(recordFilter: any) {
    if (recordFilter == null) {
      this.deviceData.data = this.devices;
    }
    else {
      let deviceFilterData: IoTDevice[] = [];
      this.devices.forEach(assetItem => {
        if (recordFilter == true) {
          recordFilter = 1;
        }
        else {
          recordFilter = 0;
        }
        if (recordFilter == assetItem.status) {
          deviceFilterData.push(assetItem);
        }
      });
      this.deviceData.data = deviceFilterData;
    }
  }

  prermissionDialogRef
  pageState

  iotDeviceMappingPopup(deviceData = {}) {
    console.log(this.pageState)
    this.prermissionDialogRef = this.dialog.open(IotDeviceComponent, {
      data: { 
        data: deviceData,
        pageState: this.pageState
      },
      disableClose: true,
      panelClass: "custommodal",
      width: '500px'
    });

    this.prermissionDialogRef = this.prermissionDialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        if (result.message) {
          this.getData();
          this.statusMessage(result.message, 'X')
        }
        this.dialog.closeAll();
      }
    });
  }

  statusMessage(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  editAsset() {

  }

  deleteEmp() {

  }
}

export type IoTDevice = {
  id: number,
  deviceSensorId: string,
  deviceName: string,
  modelName: string,
  deviceType: string,
  status: number,
}