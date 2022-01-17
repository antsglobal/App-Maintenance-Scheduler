import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaginationModel } from 'src/app/models/commonmodel';
import { InventoryServiceService } from 'src/app/services/inventory-service.service';
import { threadId } from 'worker_threads';
import { ManageStockComponent } from '../manage-stock/manage-stock.component';
import { RefillStockComponent } from '../refill-stock/refill-stock.component';
import { StockMovementComponent } from '../stock-movement/stock-movement.component';
import { PageEvent } from '@angular/material/paginator';
// import { IotDeviceComponent } from './iot-device/iot-device.component';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  prermissionDialogRef
  pageState = 'Refill'

  depTitle = 'Department';
  pageTitle
  whTitle = 'Warehouse';
  status = true;
  departments: DepartmentModel[] = []
  isDep: boolean = true;

  // pageIndex = 0;
  // pageSize = 10;
  // totalLength = 30 ;
  // pageSizeOptions: number[] = [5, 10, 15];

  size: number = 10;
  skip: number = 0;
  totalLength: number = 0;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [5, 10];

  departmentData = new MatTableDataSource<DepartmentModel>(this.departments);
  displayedColumns = [
    'id',
    'departmentName',
    'partName',
    'brand',
    'stockAvailable',
    'warehouseStock',
    'lastRefilDate',
    'refill'
  ];

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _is: InventoryServiceService
  ) {
    this.pageTitle = this.depTitle;
    if (this.router.url != '/assets/inventory/department') {
      this.isDep = false;
      this.pageTitle = this.whTitle;
      this.displayedColumns = [
        'id',
        'partName',
        'brand',
        'stockAvailable',
        'uom'
      ];
    }
  }

  ngOnInit(): void {
    if (!this.isDep) {
      this.getData()
    }
    else
    this.getData()
      // this.getComplains()
  }

  getPaginationData(pagerEvent) {
    let pager = pagerEvent;
    console.log('on-change', pager)
    this.pageIndex = pager.pageIndex.toString();
    this.size = pager.pageSize.toString();
    this.getData()
  }

  isSub: Subscription

  getData() {
    console.log(this.isDep)
    if (this.isDep) {

      let paginationObj = {
        pageNumber: this.pageIndex,
        pageSize: this.size,
        query: 'All'
      } as PaginationModel;
      console.log('before call', paginationObj)

      this.isSub = this._is.getDepartmentStockList(paginationObj).subscribe(
        (data: any) => {
          if (data && data.status == 'true') {
            this.departments = []
            this.departmentData.data = []
            let info = data.data;
            console.log('before', this.pageIndex, this.size, this.totalLength)
            console.log(info, this.departments.length);
            this.departments = info.content //[...this.departments, ...info.content]
            // this.departmentData.paginator.pageIndex = info.pageable.pageNumber;
            // this.departmentData.paginator.pageSize = info.pageable.pageSize;
            // this.departmentData.paginator.length = info.totalElements;
            // if (info.pageable.pageNumber < info.totalPages) {
            //   // this.departmentData.paginator.;
            // }
            this.totalLength = info['totalElements']  ;
            // this.pageIndex = info.pageable.pageNumber;
            // this.pageSize = info.pageable.pageSize;
            this.departmentData.data = this.departments;

            console.log('after', this.departmentData)

          }
        },
        err => {
          console.log(err);
          this.statusMessage(err.message, 'X')
        }
      )
    }

    else if (!this.isDep) {
      console.log('is not dep')
      this.departments = [
        {
          'id': 1,
          brand: 'brand A',
          partName: 'Gear Oil',
          stockAvailable: '1820',
          uom: 'Ltrs'
        },
        {
          'id': 2,
          brand: 'brand B',
          partName: 'Engine Oil',
          stockAvailable: '1820',
          uom: 'Ltrs'
        },
        {
          'id': 3,
          brand: 'brand A',
          partName: 'Grease',
          stockAvailable: '1820',
          uom: 'Kg'
        },
      ]
      this.departmentData.data = this.departments;
    }
    // this.onStatusChange()
  }

  ngAfterViewInit() {
    // this.departmentData.paginator = this.paginator;
    this.departmentData.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.departmentData.filter = filterValue;
  }

  // onStatusChange() {
  //   this.filterAssetData(this.status);
  // }

  // filterAssetData(recordFilter: any) {
  //   if (recordFilter == null) {
  //     this.departmentData.data = this.departments;
  //   }
  //   else {
  //     let deviceFilterData: DepartmentModel[] = [];
  //     this.departments.forEach(assetItem => {
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
  //     this.departmentData.data = deviceFilterData;
  //   }
  // }

  inventoryMappingPopup(departmentData = {}) {
    let obj = {
      data: {
        data: departmentData,
        pageState: this.pageState,
        idDep: this.isDep
      },
      disableClose: true,
      panelClass: "custommodal",
      width: '800px',
      maxHeight: '90vh',
      minHeight: 'inherit'
    }

    // console.log(this.pageState, obj)
    if (this.pageState == 'Refill')
      this.prermissionDialogRef = this.dialog.open(RefillStockComponent, obj);
    else if (this.pageState == 'View')
      this.prermissionDialogRef = this.dialog.open(StockMovementComponent, obj);
    else if (this.pageState == 'Add')
      this.prermissionDialogRef = this.dialog.open(ManageStockComponent, obj);

    this.prermissionDialogRef = this.prermissionDialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        if (result.message) {
          this.getData();
          this.statusMessage(result.message, 'X')
        }
        this.dialog.closeAll();
      }
    });
  }

  statusMessage(message: string, action: string, duration: number = 3000) {
    this._snackBar.open(message, action, {
      duration: duration,
    });
  }

  editAsset() {

  }
}

export type DepartmentModel = {
  id: number,
  departmentName?: string,
  partName: string,
  brand: string,
  stockAvailable: string,
  warehouseStock?: string,
  lastRefilDate?: string
  uom?: string
}