import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentComponent } from '../department/department.component';

export class AddStock {
  id
  partName
  addNewStock
  uom
  brand
  status
}
@Component({
  selector: 'app-manage-stock',
  templateUrl: './manage-stock.component.html',
  styleUrls: ['./manage-stock.component.css']
})
export class ManageStockComponent implements OnInit {
  popupTitle: string
  pageState: string = 'Add';
  defaultValues: AddStock = {
    id: null,
    partName: '',
    addNewStock: '',
    uom: '',
    brand: '',
    status: null
  }

  parts
  uoms
  brands

  addStockForm: FormGroup;
  formPrepared: boolean = false

  constructor(
    public dialogRef: MatDialogRef<DepartmentComponent>,
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
    this.getStaticInfo()
    this.prepareForm();
  }

  get assetMappingFormControl() {
    return this.addStockForm.controls;
  }

  removeWhiteSpaces(control) {
    let value = control.value;
    value = value.trim();
    control.setValue(value);
  }

  prepareForm() {
    this.addStockForm = this.fb.group({
      partName: [this.defaultValues.partName, Validators.required],
      addNewStock: [this.defaultValues.addNewStock, Validators.required],
      id: [this.defaultValues.id, Validators.nullValidator],
      uom: [this.defaultValues.uom, Validators.nullValidator],
      brand: [this.defaultValues.brand, Validators.nullValidator],
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

  getStaticInfo() {
    this.brands = [
      {
        name: 'A'
      },
      {
        name: 'B'
      }
    ]

    this.uoms = [
      {
        name: 'Kg'
      },
      {
        name: 'Ltrs'
      }
    ]

    this.parts = [
      {
        name: 'Engine Oil'
      },
      {
        name: 'Gear Oil'
      }
    ]
  }
}
