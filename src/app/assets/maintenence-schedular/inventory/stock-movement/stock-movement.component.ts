import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentComponent } from '../department/department.component';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export type StockMovementModel = {
  'id',
  'deviceName'?,
  'departmentName'?,
  // 'toDate',
  'partName'
  'quantity',
  'ceratedBy'
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
    'ceratedBy'
  ];

  
  stockFilters: FormGroup;
  formPrepared: boolean = false
  isDep: boolean = true;

  defaultValues: any = {} 
  inputData
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
  ) { 
    if (data) {
    if (data.data) {
      this.inputData = data.data
      this.defaultValues.deviceName = this.inputData.deviceName
      this.defaultValues.fromDate = this.inputData.fromDate
      this.defaultValues.toDate = this.inputData.toDate
      this.defaultValues.partType = this.inputData.partType
      
      // this.popupTitle = this.pageState + ` ${this.inputData.toDate}`
    }
    this.isDep = this.data.idDep;

      if (!this.isDep) {
        this.displayedColumns = [
          'id',
          'departmentName',
          'partName',
          'quantity',
          'ceratedBy'
        ];
        this.pageTitle = 'Warehouse Stock Movement'
      }
      console.log(this.isDep, this.displayedColumns, this.pageTitle)

    }
  }

  ngOnInit(): void {
    this.getData()
  }

  get assetMappingFormControl() {
    return this.stockFilters.controls;
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

  getData() {
    this.stocks = [
      {
        'id': 1,
        'deviceName': 'A',
        'partName': 'R1',
        'quantity':'2890 Lts',
        'ceratedBy': '21/12/2021 13:00'
      },
      {
        'id': 2,
        'deviceName': 'AAA2',
        'partName': 'R2',
        'quantity':'1231 Lts',
        'ceratedBy': '21/12/2021 13:14'
      },
      {
        'id': 3,
        'deviceName': 'A3',
        'partName': 'R3',
        'quantity':'12312 ts',
        'ceratedBy': '21/12/2021 13:15'
      },
      {
        'id': 190,
        'deviceName': 'Device 3',
        'partName': 'Gear Oil',
        'quantity':'125 Ltr',
        'ceratedBy': '21/12/2021 13:20'
      },
      {
        'id': 1092,
        'deviceName': 'Device 14',
        'partName': 'Grease',
        'quantity':'320 Kg',
        'ceratedBy': '21/12/2021 13:25'
      },
      
      {
        'id': 190,
        'deviceName': 'Device 3',
        'partName': 'Gear Oil',
        'quantity':'125 Ltr',
        'ceratedBy': '21/12/2021 13:20'
      },
      
      {
        'id': 192,
        'deviceName': 'Device 3',
        'partName': 'Gear Oil',
        'quantity':'125 Ltr',
        'ceratedBy': '21/12/2021 13:20'
      },
      
      {
        'id': 193,
        'deviceName': 'Device 3',
        'partName': 'Gear Oil',
        'quantity':'125 Ltr',
        'ceratedBy': '21/12/2021 13:20'
      },
      
      {
        'id': 194,
        'deviceName': 'Device 3',
        'partName': 'Gear Oil',
        'quantity':'125 Ltr',
        'ceratedBy': '21/12/2021 13:20'
      },
      
      {
        'id': 195,
        'deviceName': 'Device 3',
        'partName': 'Gear Oil',
        'quantity':'125 Ltr',
        'ceratedBy': '21/12/2021 13:20'
      },
      
      {
        'id': 196,
        'deviceName': 'Device 3',
        'partName': 'Gear Oil',
        'quantity':'125 Ltr',
        'ceratedBy': '21/12/2021 13:20'
      },
      
      {
        'id': 197,
        'deviceName': 'Device 3',
        'partName': 'Gear Oil',
        'quantity':'125 Ltr',
        'ceratedBy': '21/12/2021 13:20'
      },
    ]


    if (!this.isDep) {
      this.stocks = [
        {
          'id': 1,
          'departmentName': 'Loader',
          'partName': 'R1',
          'quantity':'2890 Lts',
          'ceratedBy': '21/12/2021 13:00'
        },
        {
          'id': 2,
          'departmentName': 'AAA2',
          'partName': 'R2',
          'quantity':'1231 Lts',
          'ceratedBy': '21/12/2021 13:14'
        },
        {
          'id': 3,
          'departmentName': 'A3',
          'partName': 'R3',
          'quantity':'12312 ts',
          'ceratedBy': '21/12/2021 13:15'
        },
        {
          'id': 190,
          'departmentName': 'Device 3',
          'partName': 'Gear Oil',
          'quantity':'125 Ltr',
          'ceratedBy': '21/12/2021 13:20'
        },
        {
          'id': 1092,
          'departmentName': 'Device 14',
          'partName': 'Grease',
          'quantity':'320 Kg',
          'ceratedBy': '21/12/2021 13:25'
        },
        
      ]
  
    }
    this.stockData.data = this.stocks;

    // this.onStatusChange()
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

  // onStatusChange() {
  //   this.filterAssetData(this.status);
  // }

  // filterAssetData(recordFilter: any) {
  //   if (recordFilter == null) {
  //     this.stockData.data = this.stocks;
  //   }
  //   else {
  //     let deviceFilterData: DepartmentModel[] = [];
  //     this.stocks.forEach(assetItem => {
  //       if (recordFilter == true) {
  //         recordFilter = 1;
  //       }
  //       else {
  //         recordFilter = 0;
  //       }
  //       if (recordFilter == assetItem.status) {
  //         deviceFilterData.push(assetItem);
  //       }
  //     });
  //     this.stockData.data = deviceFilterData;
  //   }
  // }



  onSubmit(value) {
    console.log('va;ues', value)
  }
  
  closePopup(msg = '', status = true) {
    this.dialogRef.close({
      status: status,
      message: msg
    });
  }

  exportPdf() {
    const doc = new jsPDF()
    doc.text('Stockmovement Data', 20, 10);
    autoTable(doc,
      {
        columns: this.displayedColumns.map(col => ({header:col,dataKey:col})),
        body: this.stockData.data
      })
    doc.save(`${this.pageTitle}.pdf`);
  }
}
