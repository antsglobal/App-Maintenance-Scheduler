import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { InventoryServiceService } from 'src/app/services/inventory-service.service';
import { DepartmentComponent, DepartmentModel } from '../department/department.component';

export type DepartmentRefillModel = {
  id,
  departmentName,
  partName,
  refilQuantity
  brand
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
    refilQuantity: '',
    brand: ''
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

  partTypes
  // = [
  //   {
  //     name: 'Gear Oil'
  //   },
  //   {
  //     name: 'Engine Oil'
  //   },
  //   {
  //     name: 'Grease'
  //   }
  // ]
  isSub: Subscription

  stockRefillForm: FormGroup;
  formPrepared: boolean = false

  constructor(
    public dialogRef: MatDialogRef<DepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private _is: InventoryServiceService,

  ) {
    if (data) {
      this.pageState = data.pageState
      if (data.data) {
        this.inputData = data.data
        this.defaultValues.id = this.inputData.id
        this.defaultValues.departmentName = this.inputData.departmentName
        this.defaultValues.brand = this.inputData.brand
        this.defaultValues.partName = this.inputData.partName
        this.popupTitle = this.pageState + ` ${this.inputData.partName}`
      }
    }
  }

  ngOnInit(): void {
    // this.getPartTypes()

    this.prepareForm();
  }

  getPartTypes() {
    this.isSub = this._is.getPartTypes().subscribe(
      (data: any) => {
        console.log(data);
        if (data && data.status == 'true') {
          this.partTypes = data.data;
          // this.departmentData.data = this.departments;
        }
      })
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
    console.log(this.defaultValues)
    this.stockRefillForm = this.fb.group({
      departmentName: [{ value: this.defaultValues.departmentName, disabled: true }, Validators.required],
      brand: [{ value: this.defaultValues.brand, disabled: true }, Validators.required],
      partName: [{ value: this.defaultValues.partName, disabled: true }, Validators.required],
      id: [this.defaultValues.id, Validators.nullValidator],
      refilQuantity: [this.defaultValues.refilQuantity, Validators.nullValidator],
    })
    this.formPrepared = true;
  }

  onSubmit(assetData) {
    if (assetData) {
      this.defaultValues.refilQuantity = assetData.refilQuantity
    }
    console.log(this.defaultValues);
    this._is.refilDepStock(this.defaultValues).subscribe((data: any) => {
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
