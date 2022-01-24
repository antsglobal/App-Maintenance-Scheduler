import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ReplacementStatusComponent } from '../common/replacement-status/replacement-status.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UtilityServiceService } from 'src/app/services/utility-service.service';
import { Subscription } from 'rxjs';
import { UtilityConsants } from 'src/app/constants/UtilityConstants';
import { DumperService } from 'src/app/services/dumper.service';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-driling',
  templateUrl: './driling.component.html',
  styleUrls: ['./driling.component.css']
})
export class DrilingComponent implements OnInit {

  driller: DrillerModel[] = []
  pageTitle = UtilityConsants.driller;
  deviceName = 'All'
  run_HoursStatus: string = 'All';

  devicesList: MachineName[] = [
    {
      deviceId: '0',
      deviceCategory: '',
      deviceMappingID: 'All',
      deviceStatus: '0'
    }
  ]

  getStatus: RunTimeStatus[] = [
    {
      hoursStatus: 'All',
      title: 'All'
    },
    {
      hoursStatus: 'RED',
      title: 'Immediate Replacement'
    },
    {
      hoursStatus: 'ORANGE',
      title: 'Near Replacement Required'
    },
    {
      hoursStatus: 'GREEN',
      title: 'Replacement Not Required'
    }
  ]

  drillerData = new MatTableDataSource<DrillerModel>(this.driller);
  displayedColumns = [
    'PId',
    'deviceName',
    'partName',
    'runHours',
    'maxHours',
    'lastReplacementDate'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _us: UtilityServiceService,
    private _ds: DumperService
  ) {
    if (this.router.url != '/assets/driller') {
      this.pageTitle = UtilityConsants.loader;
    }
  }

  ngOnInit(): void {
    this.getDevices();
    this.getData();
  }

  ngAfterViewInit() {
    this.drillerData.paginator = this.paginator;
    this.drillerData.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.drillerData.filter = filterValue;
  }

  getDataSub: Subscription
  getData(): void {
    this.getDataSub = this._us.getUtilitiesList(this.pageTitle).subscribe((data: any) => {
      console.log('data=>', data);
      this.driller = data.data
      this.drillerData.data = this.driller;
      this.onStatusChange();
    }, err => {
      console.log(err);
      this.statusMessage(err.message, 'X', 3000)
    })
  }

  getDevices() {
    this._ds.getDeviceIds(this.pageTitle).subscribe((data:any) => {
      console.log(data)
      if (data && data.status == 'true') {
        console.log('as', this.devicesList)
        this.devicesList = [ ...this.devicesList, ...data.data];
        console.log('aw', this.devicesList)
      }
    }, err => {
      console.log(err);
      this.statusMessage(err.message, 'X', 3000)
    })
  }

  onStatusChange(type = 'hoursStatus') {
    let filterInputs = [
      {
        value: this.run_HoursStatus,
        type: 'hoursStatus'
      },
      {
        value: this.deviceName,
        type: 'deviceName'
      }
    ]
    this.filterData(filterInputs)
  }

  filterData(recordFilter) {
    if (!recordFilter) {
      this.drillerData.data = this.driller;
    }
    else {
      let filterData: DrillerModel[] = [];
      this.driller.forEach(row => {
        let filterRow = 0;
        for (let index = 0; index < recordFilter.length; index++) {
          const filterObj = recordFilter[index];
          if (filterObj.value.toLowerCase() == 'all' || filterObj.value.toLowerCase() == row[filterObj.type].toLowerCase())
            filterRow++;
        }
        if (filterRow == recordFilter.length) {
          filterData.push(row);
        }
      });
      this.drillerData.data = filterData;
    }
  }

  /**
   * Opens a popup to perform an activity on the selected information.
   * Ex: To update the replacement part status for a machine.
   * @param inputData Input data to the popup
   */
  openDialog(inputData): void {
    const dialogRef = this.dialog.open(ReplacementStatusComponent, {
      width: '800px',
      data: inputData,
      disableClose: true,
      panelClass: "custommodal",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        if (result.message) {
          this.getData();
          this.statusMessage(result.message, 'X')
        }
        this.dialog.closeAll();
      }
    }, error => {
      this.statusMessage(error.message, 'X', 6000)
      this.dialog.closeAll();
    });
  }

  /**
   * Displays the status messages form the API after performing an activity like create/update/delete.
   * @param message Display the status message of the action performed.
   * @param action Actions that can be performed on the snack bar
   * @param duration Duration that the snack bar will appear if there is no action performed.
   */
  statusMessage(message: string, action: string, duration: number = 3000) {
    this._snackBar.open(message, action, {
      duration: duration,
    });
  }
}

export type DrillerModel = {
  deviceName: string,
  partName: string,
  lastReplacementDate: string,
  brand?: string,
  category?: string,
  hoursStatus: string,
  hpPercent?: number,
  maxHours: number,
  PId: number,
  quantityToBeReplaced: number,
  replaceQuantity?,
  runHours: number,
  stockAvailable?: number,
  stockId?: string,
  units?: string
}

export type RunTimeStatus = {
  'hoursStatus': string,
  'title': string
}

export type MachineName = {
  // 'id': number,
  // 'name': string
  "deviceId": string,
  "deviceCategory": string,
  "deviceMappingID": string,
  "deviceStatus": string
}