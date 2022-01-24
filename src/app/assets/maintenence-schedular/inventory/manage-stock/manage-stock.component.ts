import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { InventoryServiceService } from 'src/app/services/inventory-service.service';
import { DepartmentComponent } from '../department/department.component';

export class StockModel {
  id?
  partName
  stockAvailable
  units
  brand
  status?
}

@Component({
  selector: 'app-manage-stock',
  templateUrl: './manage-stock.component.html',
  styleUrls: ['./manage-stock.component.css']
})
export class ManageStockComponent implements OnInit {
  popupTitle: string
  pageState: string = 'Add';
  defaultValues: StockModel = {
    id: null,
    partName: '',
    stockAvailable: '',
    units: '',
    brand: '',  
    status: null
  }
  partTypes: any[] = []
  isSub: Subscription
  parts
  uoms
  brands

  addStockForm: FormGroup;
  formPrepared: boolean = false

  constructor(
    public dialogRef: MatDialogRef<DepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private _is: InventoryServiceService,
  ) {
    if (data) {
      if (data.data)
        this.defaultValues = data.data
      this.pageState = data.pageState
    }
  }

  ngOnInit(): void {
    this.getPartTypes();
    this.getStaticInfo();
    this.prepareForm();
  }
  
  isPositive(element) {
    console.log(element);
    if (element.value <= 0) {
      element.setErrors({'incorrect': true});
    }
  }

  getPartTypes() {
    this.isSub = this._is.getPartTypes().subscribe(
      (data: any) => {
        console.log(data)
        if (data && data.status == 'true') {
          this.partTypes = data.data;
          // this.departmentData.data = this.departments;
        }
      })
  }
  get assetMappingFormControl() {
    return this.addStockForm.controls;
  }

  removeWhiteSpaces(control) {
    console.log(control)
    let value = control.value;
    value = value.trim();
    control.setValue(value);
  }

  prepareForm() {
    this.addStockForm = this.fb.group({
      partName: [this.defaultValues.partName, Validators.required],
      stockAvailable: [this.defaultValues.stockAvailable, Validators.required],
      id: [this.defaultValues.id, Validators.nullValidator],
      units: [this.defaultValues.units, Validators.nullValidator],
      brand: [this.defaultValues.brand, Validators.nullValidator],
      status: [this.defaultValues.status, Validators.nullValidator]
    })
    this.formPrepared = true;
  }

  onSubmit(assetData) {
    console.log(assetData);
    this._is.addWarehouseStock(assetData).subscribe(
      (data: any) => {
        if (data && data.status == 'true') {
          this.closePopup(data.message)
        }
      },
      err => {
        this.closePopup(err.message)
      })
  }

  closePopup(msg = '', status = true) {
    this.dialogRef.close({
      status: status,
      message: msg
    });
  }

  getStaticInfo() {
    this.uoms = [
      {
        name: 'Kg'
      },
      {
        name: 'Ltrs'
      },
      {
        name: 'Qty'
      }
    ]
  }
}
