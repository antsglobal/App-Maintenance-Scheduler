import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentComponent, DepartmentModel } from '../department/department.component';

export type DepartmentRefillModel = {
  id,
  departmentName,
  partName,
  refillLiters
}
@Component({
  selector: 'app-refill-stock',
  templateUrl: './refill-stock.component.html',
  styleUrls: ['./refill-stock.component.css']
})
export class RefillStockComponent implements OnInit {
  popupTitle: string
  pageState: string = 'Create';
  defaultValues: DepartmentRefillModel = {
    id: null,
    departmentName: '',
    partName: '',
    refillLiters: ''
  }
  inputData

  departments = [
    {
      departmentName: 'Driller'
    },
    {
      departmentName: 'Loader'
    }
  ]

  partName = [
    {
      name: 'Gear Oil'
    },
    {
      name: 'Engine Oil'
    },
    {
      name: 'Grease'
    }
  ]

  stockRefillForm: FormGroup;
  formPrepared: boolean = false

  constructor(
    public dialogRef: MatDialogRef<DepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
  ) {
    if (data) {
      this.pageState = data.pageState
      if (data.data) {
        this.inputData = data.data
        this.defaultValues.id = this.inputData.id
        this.defaultValues.departmentName = this.inputData.departmentName
        this.defaultValues.partName = this.inputData.partName
        this.popupTitle = this.pageState + ` ${this.inputData.partName}`
      }
    }
  }

  ngOnInit(): void {
    this.prepareForm();
  }

  get assetMappingFormControl() {
    return this.stockRefillForm.controls;
  }

  removeWhiteSpaces(control) {
    let value = control.value;
    value = value.trim();
    control.setValue(value);
  }

  prepareForm() {
    this.stockRefillForm = this.fb.group({
      departmentName: [{ value: this.defaultValues.departmentName, disabled: true }, Validators.required],
      partName: [{ value: this.defaultValues.partName, disabled: true }, Validators.required],
      id: [this.defaultValues.id, Validators.nullValidator],
      refillLiters: [this.defaultValues.refillLiters, Validators.nullValidator],
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
