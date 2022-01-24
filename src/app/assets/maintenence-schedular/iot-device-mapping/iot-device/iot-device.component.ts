import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IotDeviceMappingServiceService } from 'src/app/services/iot-device-mapping-service.service';
import { IoTDevice, IotDeviceMappingComponent } from '../iot-device-mapping.component';

@Component({
  selector: 'app-iot-device',
  templateUrl: './iot-device.component.html',
  styleUrls: ['./iot-device.component.css']
})
export class IotDeviceComponent implements OnInit {

  // API's => 
  popupTitle: string
  pageState: string = 'Create';
  defaultValues: IoTDevice = {
    // id: null,
    deviceMappingID: '',
    deviceId: '',
    deviceCategory: '',
    modelName: '',
    deviceStatus: null
  }

  deviceMappingForm: FormGroup;
  formPrepared: boolean = false

  constructor(
    public dialogRef: MatDialogRef<IotDeviceMappingComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private _idms: IotDeviceMappingServiceService
  ) {
    console.log(data);
    if (data) {
      if (data.data) {
        this.defaultValues = data.data
      }

      this.pageState = data.pageState
    }
  }

  ngOnInit(): void {
    this.getDepartmentsLsit();
    this.prepareForm();
  }

  get assetMappingFormControl() {
    return this.deviceMappingForm.controls;
  }

  removeWhiteSpaces(control) {
    let value = control.value;
    value = value.trim();
    control.setValue(value);
  }

  prepareForm() {
    console.log(this.defaultValues);
    this.deviceMappingForm = this.fb.group({
      deviceId: [{value: this.defaultValues.deviceId, disabled: this.pageState == 'Create'? false : true }, Validators.required],
      deviceMappingID: [this.defaultValues.deviceMappingID, Validators.required],
      // id: [this.defaultValues.id, Validators.nullValidator],
      deviceCategory: [this.defaultValues.deviceCategory, Validators.nullValidator],
      modelName: [this.defaultValues.modelName, Validators.nullValidator],
      deviceStatus: [this.defaultValues.deviceStatus == '1' ? false : true, Validators.nullValidator]
    })
    this.formPrepared = true;
  }

  onSubmit(assetData) {
    if (assetData) {
      if (assetData.deviceStatus) {
        assetData.deviceStatus = '0'
      }
      else {
        assetData.deviceStatus = '1'
      }
    console.log(assetData.deviceStatus);
    }
    console.log(assetData);
    assetData['deviceId'] = this.defaultValues.deviceId;
    this._idms.manageIotDeviceMappingList(assetData).subscribe((data: any) => {
      if (data.status) {
        this.closePopup(data.message)
      }
      else {
      }
    }, err => {
      console.log(err.message)
    })
  }

  closePopup(msg = '', deviceStatus = true) {
    this.dialogRef.close({
      status: deviceStatus,
      message: msg
    });
  }

  departments
  getDepartmentsLsit() {
    this.departments = [
      {
        'departmentName': 'Loader',
      },
      {
        'departmentName': 'Driller',
      }
    ]
  }
}
