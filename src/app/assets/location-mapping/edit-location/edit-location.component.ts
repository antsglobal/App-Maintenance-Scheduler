import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocationMapping } from 'src/app/models/LocationMappingModel';
import { AssettRackingService } from '../../../services/assett-racking.service';


@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css']
})
export class EditLocationComponent implements OnInit {

  popupTitle: string
  pageState: string = 'Edit';
  defaultValues: LocationMapping = {
    chAntenna: '',
    locationDescription: '',
    rFIDReaderCode: '',
    subch: '',
    locationId: ''
  }

  locationMapping: LocationMapping
  locationMappingForm: FormGroup;
  formPrepared: boolean = false

  constructor(
    public dialogRef: MatDialogRef<EditLocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    public assetService: AssettRackingService,
  ) { }

  ngOnInit(): void {
    if (this.data) {
      if (this.data.locationData) {
        this.defaultValues = this.data.locationData
        console.log(this.defaultValues, this.data)
      }
    }
    this.prepareForm();
  }

  get locationMappingFormControl() {
    return this.locationMappingForm.controls;
  }

  removeWhiteSpaces(control) {
    let value = control.value;
    value = value.trim();
    control.setValue(value);
  }
  
  prepareForm() {
    this.locationMappingForm = this.fb.group({
      chAntenna: [this.defaultValues.chAntenna, [Validators.required, Validators.pattern("^[0-9]*$")]],
      locationDescription: [this.defaultValues.locationDescription, Validators.required],
      subch: [this.defaultValues.subch, [Validators.required, Validators.pattern("^[0-9]*$")]],
      rFIDReaderCode: [this.defaultValues.rFIDReaderCode, Validators.required],
    })
    this.formPrepared = true;
  }

  onSubmit(locationData) {
    locationData['locationId'] = this.defaultValues.locationId;
    console.log(locationData);
    this.assetService.addLocationMapping(locationData).subscribe(data => {
      if (data.status) {
        this.closePopup(data.message)
      }
      else {
        console.log('not saved')
      }
    }, err => {
      console.log('not saved', err)
    })
  }


  closePopup(msg = '', status = true) {
    this.dialogRef.close({
      status: status,
      message: msg
    });
  }
}
