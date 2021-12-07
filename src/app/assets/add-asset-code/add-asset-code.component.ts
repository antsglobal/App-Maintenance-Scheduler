import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { assetmodel } from 'src/app/models/Assets';
import { AssettRackingService } from 'src/app/services/assett-racking.service';

@Component({
  selector: 'app-add-asset-code',
  templateUrl: './add-asset-code.component.html',
  styleUrls: ['./add-asset-code.component.css']
})
export class AddAssetCodeComponent implements OnInit {

  popupTitle: string
  pageState: string = 'Create';
  defaultValues: assetmodel = {
    id: '',
    assetCode: '',
    assetDescription: '',
    locationId: '1',
    status: '1'
  }

  assetmodel: assetmodel
  assetMappingForm: FormGroup;
  formPrepared: boolean = false

  constructor(
    public dialogRef: MatDialogRef<AddAssetCodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    public assetService: AssettRackingService,
  ) { }

  ngOnInit(): void {
    this.prepareForm();
  }

  get assetMappingFormControl() {
    return this.assetMappingForm.controls;
  }

  removeWhiteSpaces(control) {
    let value = control.value;
    value = value.trim();
    control.setValue(value);
  }

  prepareForm() {
    this.assetMappingForm = this.fb.group({
      assetCode: [this.defaultValues.assetCode, Validators.required],
      assetDescription: [this.defaultValues.assetDescription, Validators.required],
      id: [this.defaultValues.id, Validators.nullValidator],
      locationId: [this.defaultValues.locationId, Validators.nullValidator],
      status: [this.defaultValues.status, Validators.nullValidator]
    })
    this.formPrepared = true;
  }

  onSubmit(assetData) {
    console.log(assetData);
    this.assetService.addAssets(assetData).subscribe(data => {
      if (data.status) {
        this.closePopup(data.message)
      }
      else {
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
