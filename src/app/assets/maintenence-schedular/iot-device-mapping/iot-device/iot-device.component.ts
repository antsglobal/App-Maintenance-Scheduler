import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    id: null,
    deviceName: '',
    deviceSensorId: '',
    deviceType: '',
    modelName: '',
    status: null
  }

  deviceMappingForm: FormGroup;
  formPrepared: boolean = false

  constructor(
    public dialogRef: MatDialogRef<IotDeviceMappingComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
  ) {
    if (data) {
      if (data.data)
        this.defaultValues = data.data
      this.pageState = data.pageState
    }
  }

  ngOnInit(): void {
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
    this.deviceMappingForm = this.fb.group({
      deviceSensorId: [this.defaultValues.deviceSensorId, Validators.required],
      deviceName: [this.defaultValues.deviceName, Validators.required],
      id: [this.defaultValues.id, Validators.nullValidator],
      deviceType: [this.defaultValues.deviceType, Validators.nullValidator],
      modelName: [this.defaultValues.modelName, Validators.nullValidator],
      status: [this.defaultValues.status, Validators.nullValidator]
    })
    this.formPrepared = true;
  }

  onSubmit(assetData) {
    console.log(assetData);
    // this.assetService.addAssets(assetData).subscribe(data => {
    //   if (data.status) {
    //     this.closePopup(data.message)
    //   }
    //   else {
    //   }
    // }, err => {
    // })
  }

  closePopup(msg = '', status = true) {
    this.dialogRef.close({
      status: status,
      message: msg
    });
  }

}
