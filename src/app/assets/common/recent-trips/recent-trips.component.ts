import { Component, OnInit } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TripDetailsComponent } from '../trip-details/trip-details.component';
import { DashboardService } from '../../../services/dashboard.service';
import { DateService } from '../../../services/date.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-recent-trips',
  templateUrl: './recent-trips.component.html',
  styleUrls: ['./recent-trips.component.css']
})
export class RecentTripsComponent implements OnInit {

  prermissionDialogRef: any;
  dialogRefSubscribe: Subscription;

  trips = []

  refreshData = false;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  constructor(
    public dialog: MatDialog,
    private _dashboardService: DashboardService,
    private _dateService: DateService
  ) { }

  ngOnInit(): void {
    this.getRecentTrips();
    this.refreshData = true;
    this.autoRefersh();
  }

  autoRefersh() {
    if (this.refreshData)
      setTimeout(() => {
        this.getRecentTrips();
        this.autoRefersh();
      }, 10000);
  }

  recentTripSub: Subscription
  getRecentTrips() {
    this.recentTripSub = this._dashboardService.getRecentTrips().pipe(takeUntil(this.destroyed$)).subscribe(data => {
      this.trips = data;
    })
  }

  getFormatedDate(date) {
    this._dateService.formatDate(date);
  }

  viewTripDetails(tripData) {
    this.openDialog('View', tripData)
  }

  openDialog(action, data) {
    let width = '500px';

    // if (action == 'Delete') {
    //   width = 'auto';
    // }
    this.prermissionDialogRef = this.dialog.open(TripDetailsComponent, {
      data: { pageState: action, tripData: data },
      disableClose: true,
      panelClass: "custommodal",
      width: width
    });

    this.dialogRefSubscribe = this.prermissionDialogRef.afterClosed().subscribe(result => {
      if (result.status) {
        // this.getSCCLsList();
        // this.statusMessage(result.message, 'X')
      }
    });
  }

  ngOnDestroy(): void {
    this.refreshData = false;
    this.destroyed$.next(true);
    this.destroyed$.complete();
    if(this.recentTripSub)
      this.recentTripSub.unsubscribe()
  }
}
