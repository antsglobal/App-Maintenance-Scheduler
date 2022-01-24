import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentComponent } from '../department/department.component';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { InventoryServiceService } from 'src/app/services/inventory-service.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { IotDeviceMappingServiceService } from 'src/app/services/iot-device-mapping-service.service';

export type StockMovementModel = {
  'id',
  'deviceName'?,
  'departmentName'?,
  // 'toDate',
  'partName'
  'quantity',
  'createdDate'
}


@Component({
  selector: 'app-stock-movement',
  templateUrl: './stock-movement.component.html',
  styleUrls: ['./stock-movement.component.css']
})
export class StockMovementComponent implements OnInit {

  popupTitle: string
  pageState: string = '';


  pageTitle = 'Department Stock Movement';
  status = true;
  stocks: StockMovementModel[] = []
  prermissionDialogRef

  stockData = new MatTableDataSource<StockMovementModel>(this.stocks);
  displayedColumns = [
    'id',
    'deviceName',
    'partName',
    'quantity',
    'createdDate'
  ];


  stockFilters: FormGroup;
  formPrepared: boolean = false
  isDep: boolean = true;

  defaultValues: any = {}
  inputData
  partTypes: any[] = []
  isSub: Subscription

  todaysDate

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private _is: InventoryServiceService, public datepipe: DatePipe,
    private _idms: IotDeviceMappingServiceService
  ) {

    let today = new Date();
    this.todaysDate = this.datepipe.transform(today, 'yyyy-MM-dd');

    this.defaultValues.deviceName = 'All'
    this.defaultValues.partType = 'All'
    this.defaultValues.departmentName = 'All'
    this.defaultValues.fromDate = this.todaysDate
    this.defaultValues.toDate = this.todaysDate

    if (data) {
      // if (data.data) {
      //   this.inputData = data.data
      //   this.defaultValues.deviceName = this.inputData.deviceName
      //   if (this.inputData.fromDate)
      //     this.defaultValues.fromDate = this.inputData.fromDate
      //   if (this.inputData.toDate)
      //     this.defaultValues.toDate = this.inputData.toDate
      //   this.defaultValues.partType = this.inputData.partType

      //   // this.popupTitle = this.pageState + ` ${this.inputData.toDate}`
      // }

      this.isDep = this.data.isDep;

      if (!this.isDep) {
        this.displayedColumns = [
          'id',
          'departmentName',
          'partName',
          'quantity',
          'createdDate'
        ];
        this.pageTitle = 'Warehouse Stock Movement'
      }
      console.log(this.isDep, this.displayedColumns, this.pageTitle)
    }
  }

  dMinDate

  setMinDate(setToDate = false) {
    this.dMinDate = this.stockFilters.controls.fromDate.value;
    if (setToDate)
      this.stockFilters.controls.toDate.setValue(this.stockFilters.controls.fromDate.value);
  }

  ngOnInit(): void {
    this.getPartTypes()
    this.getData()
    this.getDepartmentsLsit()
    this.getDevicesList()
  }

  get assetMappingFormControl() {
    return this.stockFilters.controls;
  }

  getPartTypes() {
    this.partTypes = [
      {
        'partName': 'All'
      }
    ]
    this.isSub = this._is.getPartTypes().subscribe(
      (data: any) => {
        console.log(data);
        if (data && data.status == 'true') {
          this.partTypes = [...this.partTypes, ...data.data];
        }
      })
  }

  prepareForm() {
    this.stockFilters = this.fb.group({
      fromDate: [this.defaultValues.fromDate],
      toDate: [this.defaultValues.toDate],
      deviceName: [this.defaultValues.deviceName],
      departmentName: [this.defaultValues.deviceName],
      partType: [this.defaultValues.partType],
    })
    this.formPrepared = true;
  }

  getData(obj = {
    fromDate: this.defaultValues.fromDate,
    toDate: this.defaultValues.toDate
  }) {

    this._is.getDepartmentStockMovement(obj).subscribe(
      (data: any) => {
        console.log(data);
        if (data && data.status == 'true') {
          this.stocks = data.data;
          this.stockData.data = this.stocks;
          this.onStatusChange();
        }
      })
    if (!this.isDep) {
      this._is.getWarehouseStockMovement(obj).subscribe(
        (data: any) => {
          console.log(data);
          if (data && data.status == 'true') {
            this.stocks = data.data;
            this.stockData.data = this.stocks;
            this.onStatusChange();
          }
        })
    }
    this.prepareForm();
  }

  ngAfterViewInit() {
    this.stockData.paginator = this.paginator;
    this.stockData.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.stockData.filter = filterValue;
  }

  departments
  getDepartmentsLsit() {
    this.departments = [
      {
        'departmentName': 'All'
      },
      {
        'departmentName': 'Loader',
      },
      {
        'departmentName': 'Driller',
      }
    ]
  }

  devices
  getDevicesList() {
    this.devices = [
      {
        'deviceMappingID': 'All'
      }
    ]
    this._idms.getIotDeviceMappingList().subscribe((data: any) => {
      if (data && data.status == 'true') {
        this.devices = [...this.devices, ...data.data];
      }
      err => {
        console.log(err);
      }
    })
  }

  onStatusChange() {
    let filterInputs = [
      {
        value: this.stockFilters.controls.partType.value,
        type: 'partName'
      }
    ]
    if (!this.isDep) {
      filterInputs.push(
        {
          value: this.stockFilters.controls.departmentName.value,
          type: 'departmentName'
        }
      )
    }
    else {
      filterInputs.push(
        {
          value: this.stockFilters.controls.deviceName.value,
          type: 'deviceName'
        }
      )
    }
    this.filterData(filterInputs)
  }

  filterData(recordFilter) {
    if (!recordFilter) {
      this.stockData.data = this.stocks;
    }
    else {
      let filterData: StockMovementModel[] = [];
      console.log(recordFilter)
      this.stocks.forEach(row => {
        let filterRow = 0;
        console.log(row);
        for (let index = 0; index < recordFilter.length; index++) {
          const filterObj = recordFilter[index];
          if ((filterObj.value.toLowerCase() == 'all' || filterObj.value.toLowerCase() == row[filterObj.type].toLowerCase())) {
            console.log(filterObj.value, filterObj.type, row[filterObj.type])
            filterRow++;
          }
        }
        if (filterRow == recordFilter.length) {
          filterData.push(row);
        }
      });
      this.stockData.data = filterData;
    }
  }

  onSubmit(value) {
    this.defaultValues.fromDate = value.fromDate;
    this.defaultValues.toDate = value.toDate;
    this.getData();
  }

  closePopup(msg = '', status = true) {
    this.dialogRef.close({
      status: status,
      message: msg
    });
  }

  // To export data into PDF.
  exportPdf() {
    const doc = new jsPDF()
    doc.text(this.pageTitle, 20, 10);
    autoTable(doc,
      {
        columns: this.displayedColumns.map(col => ({ header: col, dataKey: col })),
        body: this.stockData.data
      })
    doc.save(`${this.pageTitle}.pdf`);
  }
}
