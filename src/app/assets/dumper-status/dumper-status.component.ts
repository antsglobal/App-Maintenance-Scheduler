import { Component, OnInit, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { DumperService } from '../../services/dumper.service';
import { ReplaySubject, Subscription } from 'rxjs';
import { dumpermodel } from 'src/app/models/dumpermodel';
import { DumperStatus } from '../../models/dumpermodel';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dumper-status',
  templateUrl: './dumper-status.component.html',
  styleUrls: ['./dumper-status.component.css']
})
export class DumperStatusComponent implements OnInit {

  fetchData: boolean = false;

  dumpers
  dumperStatus
  dumperStatusSub: Subscription
  errorMessage
  selectedDumperId
  dumperStates

  // google maps zoom level
  zoom: number = 15;
  fetchMapPosition: boolean = true

  // initial center position for the map
  lat: number = 17.45;
  lng: number = 78.47;

  markers: marker = {
    lat: 13.602386754765257,
    lng: 79.41776506571027,
    draggable: false
  }

  noDataFound: boolean = false;

  refreshData = false;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private dumperService: DumperService) { }

  ngOnInit(): void {
    this.getDeviceIds()
    // this.getDumperData();
  }

  autoRefersh() {
    if (this.refreshData)
      setTimeout(() => {
        console.log('inside autorefresh')
        this.getDumperData();
        this.autoRefersh();
      }, 20000);
  }

  getDumperData() {
    // this.fetchData = false;
    this.fetchMapPosition = false
    this.dumperStatusSub = this.dumperService.getDumperStatus(this.selectedDumperId).pipe(takeUntil(this.destroyed$)).subscribe(data => {
      if (data) {
        this.noDataFound = false;
        this.dumperStatus = data['data'];
        // this.dumperStatus = data;
        this.addMarker()
        this.defineDumperStatus(this.dumperStatus['status'].toLowerCase())
        this.fetchData = true;
        if (!this.refreshData) {
          this.refreshData = true;
          this.autoRefersh();
          console.log('inside getting data')
        }
      }
      else if(data === null) {
        this.refreshData = true;
        this.noDataFound = true;
      }
    }, error => {
      this.noDataFound = true;
      console.log(error);
    })
  }

  defineDumperStatus(exp) {
    this.dumperStates = {
      loading: 'disabled',
      transit: 'disabled',
      unloading: 'disabled',
    }
    switch (exp) {
      case 'tripend':
        this.dumperStates.transit = 'inprogress'
        this.dumperStates.unloading = 'complete'
        break;
      case 'unloading':
        this.dumperStates.loading = 'complete'
        this.dumperStates.transit = 'complete'
        this.dumperStates.unloading = 'inprogress'
        break;
      case 'transit':
        this.dumperStates.loading = 'complete'
        this.dumperStates.transit = 'inprogress'
        break;
      case 'loading':
        this.dumperStates.loading = 'inprogress'
        break;
    }
  }

  getDeviceIds(): void {
    const newdumper: dumpermodel = {
      deviceCatagory: 'Dumper'
    } as dumpermodel;
    this.dumperService.getDeviceIds().subscribe({
      next: (dumperids) => {
        this.dumpers = dumperids['data'];
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  getDumperMappingId(dumperDeviceId) {
    return this.dumpers.find(item => item.deviceId == dumperDeviceId)
  }

  clickedMarker() {
    // console.log(`clicked the marker:`)
  }

  addMarker(dumperLoc = this.dumperStatus) {
    this.lat = parseInt(dumperLoc.latitude)
    this.lng = parseInt(dumperLoc.longitude)
    let dumperdetails = this.getDumperMappingId(this.selectedDumperId);
    this.markers = {
      lat: this.lat,
      lng: this.lng,
      label: dumperdetails.deviceMappingID,
      draggable: false
    };
    this.fetchMapPosition = true
  }

  markerDragEnd($event: MouseEvent) {
    console.log('dragEnd', $event);
  }

  ngOnDestroy(): void {
    this.refreshData = false;
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}