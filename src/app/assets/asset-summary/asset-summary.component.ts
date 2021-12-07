import { Component, OnInit } from '@angular/core';
import { AssettRackingService } from '../../services/assett-racking.service';
import { AssetHelper } from '../../helpers/asset-helpers';
import { AssetDetail, AssetsCountByLocation } from 'src/app/models/assettracking';
import { ReplaySubject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-asset-summary',
  templateUrl: './asset-summary.component.html',
  styleUrls: ['./asset-summary.component.css']
})
export class AssetSummaryComponent implements OnInit {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  locations
  fetchData: boolean = false
  displayAssetLocations: boolean = false
  locationAssetsList: AssetDetail[]
  activeLocationName: string
  asssetCountByLocation: AssetsCountByLocation[]
  activeLocationId
  locationImages
  totalAsssetsInLocation

  locationsSub: Subscription
  asssetCountByLocationSub: Subscription
  assetDataSub: Subscription
  locationImagesSub: Subscription

  refreshData = false;

  constructor(private assetservice: AssettRackingService, private _assetHelper: AssetHelper) {
    this.locationsSub = this.assetservice.getAssetLocations().pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      this.locations = data;
    })

    this.asssetCountByLocationSub = this.assetservice.getAssetCountByLocation().pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      this.asssetCountByLocation = data;
    })

    // this.getAssetCounts();

    this.locationImagesSub = this.assetservice.getLocationsImages().pipe(takeUntil(this.destroyed$)).subscribe(data => {
      this.locationImages = data;
      this.fetchData = true;
    })
  }

  ngOnInit(): void {
    // this.getAssetCounts()
    this.refreshData = true;
    this.autoRefersh();
  }

  getAssetCounts() {
    this.assetservice.getAssetCountByLocation().pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      this.asssetCountByLocation = data;
    })
    
  }

  autoRefersh() {
    if (this.refreshData)
      setTimeout(() => {
        this.getAssetsListByLocation(this.activeLocationId)
        this.getAssetCounts()
        this.autoRefersh();
      }, 15000);
  }

  getAssetsListByLocation(locationId = 0) {
    if (this.activeLocationId != locationId && !this.displayAssetLocations)
      this.displayAssetLocations = false;
    if (locationId > 0) {
      this.activeLocationId = locationId
      this.activeLocationName = this.getLocationNameById(locationId).locationDescription.replace(/_/g, " ");
      this.assetDataSub = this.assetservice.getlocationAssetDetails(locationId).pipe(takeUntil(this.destroyed$)).subscribe((data) => {
        let assetData = this._assetHelper.assetsByLocation(data);
        this.locationAssetsList = assetData.data
        this.totalAsssetsInLocation = assetData.totalCount
        this.displayAssetLocations = true;
      })
    }
  }

  getLocationNameById(locationId) {
    return this.locations.find(location => {
      return location.locationId == locationId
    });
  }

  getLocationImage(locationId) {
    this.locationImages.find(item => item.locationId == locationId)
  }

  getLocationAssetCount(id) {
    let item: any
    if (this.asssetCountByLocation)
      item = this.asssetCountByLocation.find(item => item.LocationId == id)
    return (item && item.AssetCount) ? item.AssetCount : 0
  }

  ngOnDestroy(): void {
    this.refreshData = false;
    if (this.locationsSub) {
      this.locationsSub.unsubscribe();
    }
    if (this.asssetCountByLocationSub) {
      this.asssetCountByLocationSub.unsubscribe();
    }
    if (this.assetDataSub) {
      this.assetDataSub.unsubscribe();
    }
    if (this.locationImagesSub) {
      this.locationImagesSub.unsubscribe();
    }
    
    this.destroyed$.next(true);
    this.destroyed$.complete();
  
  }
}
