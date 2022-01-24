import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { IotDeviceMappingServiceService } from 'src/app/services/iot-device-mapping-service.service';
import { IotDeviceComponent } from './iot-device/iot-device.component';

@Component({
  selector: 'app-iot-device-mapping',
  templateUrl: './iot-device-mapping.component.html',
  styleUrls: ['./iot-device-mapping.component.css']
})
export class IotDeviceMappingComponent implements OnInit {

  pageTitle = 'IoT Device Mapping';
  deviceStatus = true;
  devices: IoTDevice[] = []

  deviceData = new MatTableDataSource<IoTDevice>(this.devices);
  displayedColumns = [
    // 'id',
    'deviceId',
    'deviceMappingID',
    'modelName',
    'deviceCategory',
    'deviceStatus',
    'actions'
  ];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _idms: IotDeviceMappingServiceService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this._idms.getIotDeviceMappingList().subscribe((data: any) => {
      if (data && data.status == 'true') {
        this.deviceData.data, this.devices = []
        this.devices = data.data;
        this.deviceData.data = this.devices;
        this.onStatusChange()
      }
      err => {
        console.log(err);
        this.statusMessage(err.message, 'X')
      }
    })
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
    this.filterAssetData(this.deviceStatus);
  }

  filterAssetData(recordFilter: any) {
    if (recordFilter == null) {
      this.deviceData.data = this.devices;
    }
    else {
      let deviceFilterData: IoTDevice[] = [], statusCheck;
      console.log(this.devices)
      if (recordFilter == true) {
        statusCheck = '0';
      }
      else {
        statusCheck = '1';
      }
      this.devices.forEach(assetItem => {
        console.log(statusCheck, assetItem.deviceStatus)
        if (statusCheck == assetItem.deviceStatus) {
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
        this.getData();
        if (result.message) {
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
  // id: number,
  deviceId: string,
  deviceMappingID: string,
  modelName: string,
  deviceCategory: string,
  deviceStatus: string,
}