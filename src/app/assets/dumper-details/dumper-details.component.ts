import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { dumpermodel } from 'src/app/models/dumpermodel';
import { DumperService } from 'src/app/services/dumper.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dumper-details',
  templateUrl: './dumper-details.component.html',
  styleUrls: ['./dumper-details.component.css']
})
export class DumperDetailsComponent implements OnInit {
  fromDate: Date;
  toDate: Date;
  dumper: dumpermodel[] = [];
  dumperFilter: dumpermodel[] = [];
  selecte_dumperId: any[];
  getDumpers: any;
  dMinDate

  errorMessage: string;
  todaysDate: any;
  dmp: any;
  constructor(private dumperService: DumperService, public datepipe: DatePipe) {
    let today = new Date();
    this.todaysDate = this.datepipe.transform(today, 'yyyy-MM-dd');
    this.fromDate = this.todaysDate
    this.toDate = this.todaysDate
  }
  dumperData = new MatTableDataSource<dumpermodel>(this.dumper);
  displayedColumns = ['dumperId', 'loadDeviceValue', 'unloadDeviceValue', 'date', 'status'];

  ngOnInit(): void {
    this.GetDumperIds();
    this.GetData(this.fromDate, this.toDate);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.dumperData.paginator = this.paginator;
    this.dumperData.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dumperData.filter = filterValue;
  }

  setMinDate(setToDate = false) {
    this.dMinDate = this.fromDate;
    if (setToDate)
      this.toDate = this.fromDate;
  }

  GetData(fromDate: Date, toDate: Date): void {
    const newDumper: dumpermodel = { fromDate, toDate } as dumpermodel;
    this.dumperService.getDumperDetails(newDumper).subscribe(
      (dumperRecords) => {
        this.dumper = dumperRecords['data'];
        this.filterDumperData(null);
      }
    )
  }

  GetDumperIds(): void {
    const newdumper: dumpermodel = {} as dumpermodel;
    this.dumperService.getDumperIds(newdumper).subscribe({
      next: (dumperids) => {
        this.dmp = dumperids['data'];
        this.getDumpers = this.dmp;
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  filterDumpers() {
    this.GetData(this.fromDate, this.toDate);
  }

  onDumperChange() {
    if (this.selecte_dumperId.length > 0) {
      this.filterDumperData(this.selecte_dumperId);
    }
    else {
      this.filterDumperData(null);
    }
  }

  filterDumperData(recordFilter: any) {
    if (recordFilter == null) {
      this.dumperData.data = this.dumper;
    }
    else {
      let dumperFilterData: dumpermodel[] = [];
      this.dumper.forEach(dumperItem => {
        if (recordFilter.indexOf(dumperItem.dumperId) >= 0) {
          dumperFilterData.push(dumperItem);
        }
      });
      this.dumperData.data = dumperFilterData;
    }
  }

}



