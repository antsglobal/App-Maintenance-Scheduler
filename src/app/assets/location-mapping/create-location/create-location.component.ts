import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocationMapping } from 'src/app/models/LocationMappingModel';
import { AssettRackingService } from '../../../services/assett-racking.service';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.css']
})
export class CreateLocationComponent implements OnInit {

  popupTitle: string
  pageState: string = 'Create';
  defaultValues: LocationMapping = {
    chAntenna: '',
    locationDescription: '',
    rFIDReaderCode: '',
    subch: ''
  }

  locationMapping: LocationMapping
  locationMappingForm: FormGroup;
  formPrepared: boolean = false

  constructor(
    public dialogRef: MatDialogRef<CreateLocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    public assetService: AssettRackingService,
    ) { }

  ngOnInit(): void {
    this.prepareForm();
  }

  get locationMappingFormControl() {
    return this.locationMappingForm.controls;
  }

  prepareForm() {
    this.locationMappingForm = this.fb.group({
      chAntenna: [this.defaultValues.chAntenna, [Validators.required, Validators.pattern("^[0-9]*$")]],
      locationDescription: [this.defaultValues.locationDescription, Validators.required],
      subch: [this.defaultValues.subch,[Validators.required, Validators.pattern("^[0-9]*$")]],
      rFIDReaderCode: [this.defaultValues.rFIDReaderCode, Validators.required],
    })
    this.formPrepared = true;
  }

  removeWhiteSpaces(control) {
    let value = control.value;
    value = value.trim();
    control.setValue(value);
  }

  onSubmit(locationData) {
    console.log(locationData);
    this.assetService.addLocationMapping(locationData).subscribe(data => {
      if (data.status) {
        this.closePopup(data.message)
      }
      else {
        console.log('not saved')
      }
    }, err => {

    })
  }

  
  closePopup(msg = '', status = true) {
    this.dialogRef.close({
      status: status,
      message: msg
    }); 
  }
}
