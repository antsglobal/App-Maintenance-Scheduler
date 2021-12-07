import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LocationMapping } from 'src/app/models/LocationMappingModel';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AssettRackingService } from '../../services/assett-racking.service';
import { Subscription } from 'rxjs';
import { CreateLocationComponent } from './create-location/create-location.component';
import { element } from 'protractor';
import { EditLocationComponent } from './edit-location/edit-location.component';

@Component({
  selector: 'app-location-mapping',
  templateUrl: './location-mapping.component.html',
  styleUrls: ['./location-mapping.component.css']
})
export class LocationMappingComponent implements OnInit {

  displayedColumns: string[] = [
    'rFIDReaderCode',
    'locationDescription',
    'chAntenna',
    'subch',
    'actions'
  ]
  locationDataSource = new MatTableDataSource<LocationMapping>();
  pageState = 'create'
  locationDataSourceSub: Subscription
  prermissionDialogRef

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public assetService: AssettRackingService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  ngAfterViewInit() {
    this.locationDataSource.paginator = this.paginator;
    this.locationDataSource.sort = this.sort;
  }

  getData() {
    this.locationDataSourceSub = this.assetService.getLocationMappingList().subscribe(data => {
      this.locationDataSource.data = data['data'];
    })
  }

  addLocation() {
    this.prermissionDialogRef = this.dialog.open(CreateLocationComponent, {
      data: { locationData: '' },
      disableClose: true,
      panelClass: "custommodal",
      width: '500px'
    });

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

  statusMessage(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  editEmp(element) {
    this.prermissionDialogRef = this.dialog.open(EditLocationComponent, {
      data: { locationData: element },
      disableClose: true,
      panelClass: "custommodal",
      width: '500px'
    });

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

  ngOnDestroy(): void {
    if (this.locationDataSourceSub)
      this.locationDataSourceSub.unsubscribe();
  }
}
