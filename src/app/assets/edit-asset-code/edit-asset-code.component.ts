import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { assetmodel } from 'src/app/models/Assets';
import { AssettRackingService } from 'src/app/services/assett-racking.service';

@Component({
  selector: 'app-edit-asset-code',
  templateUrl: './edit-asset-code.component.html',
  styleUrls: ['./edit-asset-code.component.css']
})
export class EditAssetCodeComponent implements OnInit {

  popupTitle: string
  pageState: string = 'Edit';
  defaultValues: assetmodel = {
    id: '',
    assetCode: '',
    assetDescription: '',
    locationId: '',
    status: ''
  }

  assetmodel: assetmodel
  assetForm: FormGroup;
  formPrepared: boolean = false

  constructor(
    public dialogRef: MatDialogRef<EditAssetCodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    public assetService: AssettRackingService,
  ) { }

  ngOnInit(): void {
    if (this.data) {
      if (this.data.assetData) {
        this.defaultValues = this.data.assetData
        console.log(this.defaultValues, this.data)
      }
    }
    this.prepareForm();
  }

  get assetsFormControl() {
    return this.assetForm.controls;
  }

  removeWhiteSpaces(control) {
    let value = control.value;
    value = value.trim();
    control.setValue(value);
  }

  prepareForm() {
    this.assetForm = this.fb.group({
      id: [this.defaultValues.id, Validators.required],
      assetCode: [this.defaultValues.assetCode, Validators.required],
      assetDescription: [this.defaultValues.assetDescription, Validators.required],
      locationId: [this.defaultValues.locationId, Validators.required],
      status: [this.defaultValues.status, Validators.required],
    })
    this.formPrepared = true;
  }
  onSubmit(assetData) {
    assetData['id'] = this.defaultValues.id;
    assetData['location'] = this.defaultValues.locationId;
    if (assetData['status'] == true) {
      assetData['status'] = 1;
    }
    else assetData['status'] = 0;
    this.assetService.addAssets(assetData).subscribe(data => {
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
