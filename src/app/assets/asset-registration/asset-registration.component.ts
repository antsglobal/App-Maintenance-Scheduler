import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { assetmodel } from 'src/app/models/Assets';
import { AssettRackingService } from 'src/app/services/assett-racking.service';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { AddAssetCodeComponent } from '../add-asset-code/add-asset-code.component';
import { EditAssetCodeComponent } from '../edit-asset-code/edit-asset-code.component';
import { PopupMessageComponent } from '../popup-message/popup-message.component';

@Component({
  selector: 'app-asset-registration',
  templateUrl: './asset-registration.component.html',
  styleUrls: ['./asset-registration.component.css']
})
export class AssetRegistrationComponent implements OnInit {

  fromDate: Date;
  toDate: Date;
  asset: assetmodel[] = [];
  assetFilter: assetmodel[] = [];
  selecte_dumperId: any[];
  getAssets: any;
  status1: string = 'true';
  pageState = 'create'
  locationDataSourceSub: Subscription
  prermissionDialogRef

  errorMessage: string;
  constructor(private assetservice: AssettRackingService, public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public assetService: AssettRackingService,
    public confirmationDialogService: ConfirmationDialogService) {

  }
  assetData = new MatTableDataSource<assetmodel>(this.asset);
  displayedColumns = ['id', 'assetCode', 'assetDescription', 'locationId', 'status', 'actions'];

  ngOnInit(): void {
    this.GetData();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.assetData.paginator = this.paginator;
    this.assetData.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.assetData.filter = filterValue;
  }

  GetData(): void {
    const newDumper: assetmodel = { status: this.status1 } as assetmodel;
    this.assetservice.getAssetMasters(newDumper).subscribe(
      (dumperRecords) => {
        this.asset = dumperRecords['data'];
        this.filterAssetData(this.status1);
      }
    )
  }

  addAsset() {
    this.prermissionDialogRef = this.dialog.open(AddAssetCodeComponent, {
      data: { locationData: '' },
      disableClose: true,
      panelClass: "custommodal",
      width: '500px'
    });

    this.prermissionDialogRef = this.prermissionDialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        if (result.message) {
          this.GetData();
          this.statusMessage(result.message, 'X')
        }
        this.dialog.closeAll();
      }
    });
  }

  someFucn() {
    this.filterAssetData(this.status1);
  }

  editEmp(element) {
    console.log(element);
    this.prermissionDialogRef = this.dialog.open(EditAssetCodeComponent, {
      data: { assetData: element },
      disableClose: true,
      panelClass: "custommodal",
      width: '500px'
    });

    this.prermissionDialogRef = this.prermissionDialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        if (result.message) {
          this.GetData();
          this.statusMessage(result.message, 'X')
        }
        this.dialog.closeAll();
      }
    });
  }

  deleteEmp(element) {
    //element['status'] = 0;
    this.confirmationDialogService
      .confirm('Please confirm..', 'Are you sure you want to delete this item?')
      .then((confirmed) => this.DeleteData(element, confirmed))
      .catch(() =>
        console.log(
          'User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'
        )
      );
  }

  DeleteData(element1: any, confirmed: boolean): void {
    if (confirmed == true) {
      this.assetService.deleteAssets(element1).subscribe(data => {
        if (data.status) {
          this.statusMessage("Asset Deleted Successfull", "ok")
          this.GetData();
        }
      }, err => {
        console.log('not saved', err)
      })
    }
  }


  statusMessage(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }


  filterAssetData(recordFilter: any) {
    if (recordFilter == null) {
      this.assetData.data = this.asset;
    }
    else {
      let assetFilterData: assetmodel[] = [];
      this.asset.forEach(assetItem => {
        if (recordFilter == true) {
          recordFilter = 1;
        }
        else {
          recordFilter = 0;
        }
        if (recordFilter == assetItem.status) {
          assetFilterData.push(assetItem);
        }
      });
      this.assetData.data = assetFilterData;
    }
  }
}
