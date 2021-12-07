import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecentTripsComponent } from '../recent-trips/recent-trips.component';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  pageState: string
  popupTitle: string
  rows = []
  tripDetails

  constructor(
    public dialogRef: MatDialogRef<RecentTripsComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    if (data) {
      this.pageState = data.pageState
      this.getPopupTitle(data)
      this.tripDetails = data.tripData;
      // this.getDetailRows(data.tripData)
    }
  }

  ngOnInit(): void {
  }

  /**
   * To set the popup title
   */
  getPopupTitle(data) {
    this.popupTitle = `Recent Trip ${data.tripData.dumperId} Details`;
  }

  getDetailRows(data) {
    let row = {}

    
  }
}
