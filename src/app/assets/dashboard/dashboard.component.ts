import { Component, OnChanges, OnInit } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { AssettRackingService } from '../../services/assett-racking.service';
import { AssetHelper } from 'src/app/helpers/asset-helpers';
import { DatePipe } from '@angular/common';
import { DateService } from '../../services/date.service';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardHelper } from '../../helpers/dashboard-helper';
import { DashboardWidgetData } from '../../models/dashboarddatamodel ';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  // providers: [DatePipe]
})
export class DashboardComponent implements OnInit {

  dashboardDate
  fromDate;
  toDate;
  dMinDate

  dateRange = {
    fromDate: '',
    toDate: '',
    tripsByDate: [],
    range: []
  }

  dumperUtilization
  shovelUtilization
  tripCounter
  upcomingTrips

  devicesCount
  dashboardData: DashboardWidgetData
  fetchData = false;

  constructor(
    public datepipe: DatePipe,
    private dateService: DateService,
    public dashboardService: DashboardService,
    public dashboardHelper: DashboardHelper
  ) {
    let today = new Date();
    this.dashboardDate = this.datepipe.transform(today, 'yyyy-MM-dd');
    this.fromDate = this.dashboardDate
    this.toDate = this.dashboardDate
    // this.setDateRange();
  }

  ngOnInit(): void {
    this.getDevicesCount()
  }

  getDevicesCount() {
    this.dashboardService.getDevicesCount().subscribe(data => {
      this.devicesCount = data[0];
      this.getDashboardData()
    })
  }

  getDashboardData() {
    this.dashboardService.getDashboardWidgetsData({ fromDate: this.fromDate, toDate: this.toDate }).subscribe(
      (data) => {
        let range = []
        range = this.dateService.getBetweenDates(this.fromDate, this.toDate)
        this.dashboardData = this.dashboardHelper.widgetCount(data, range, this.devicesCount);
        this.setDateRange(range);
      }
    )

    this.upcomingTrips = {
      'trips': 36
    }
  }

  setMinDate(setToDate = false) {
    this.dMinDate = this.fromDate;
    if (setToDate)
    this.toDate = this.fromDate;
  }

  setDateRange(range = []) {
    this.setMinDate();
    this.dateRange = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      tripsByDate: this.dashboardData.tripAnalysis,
      range: range
    }
    this.fetchData = true;
  }

}
