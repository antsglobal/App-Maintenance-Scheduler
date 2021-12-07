import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asset, AssetTrackingAdapter, AssetLocationAdapter } from '../models/assettracking';
import { ServiceConstants } from '../constants/ServiceConstants';
import { map } from 'rxjs/operators';
import { assetmodel } from '../models/Assets';
import { LocationMapping } from '../models/LocationMappingModel';

@Injectable({
  providedIn: 'root'
})

export class AssettRackingService {

  private assetTrackingApiUrl = ServiceConstants.baseurlv1 + '/getassets';
  private assetLocationsApiUrl = ServiceConstants.baseurlv1 + '/getlocations';
  private assetTrackingDetailsApiUrl = ServiceConstants.baseurlv1 + '/assettrackingforui';
  private assetCountByLocationApiUrl = ServiceConstants.baseurlv1 + '/getdevicecount';
  private getAssetsApiUrl = '/assetview';
  private assetDetails = '../appdata/asset-details.json';
  private locationMappingListAPIUrl = ServiceConstants.baseurlv1 + '/assetlocationsview';
  private locationMappingAddingListAPIUrl = ServiceConstants.baseurlv1 + '/assetlocationsadding';
  private addAssetsAPIUrl = ServiceConstants.baseurlv1 + '/assetadding';

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private assetAdapter: AssetTrackingAdapter, private assetCountAdapter: AssetLocationAdapter) { }

  getAssetDetails(): Observable<any> {
    this.assetTrackingApiUrl = this.assetDetails;
    return this.http.get(this.assetTrackingApiUrl).pipe(
      map((response: any) => {
        return response.map(item => {
          return this.assetAdapter.adapt(item)
        })
      }));
  }

  public getAssetMasters(assetmodel: assetmodel): Observable<assetmodel[]> {


    return this.http.get<assetmodel[]>(
      ServiceConstants.baseurlv1 + this.getAssetsApiUrl);
  }


  getlocationAssetDetails(id = 0): Observable<any> {
    this.assetTrackingApiUrl = ServiceConstants.baseurlv1 + '/getassets';;
    return this.http.post(this.assetTrackingApiUrl, { locationId: id }).pipe(
      map((response: any) => {
        return response.map(item => {
          return this.assetAdapter.adapt(item)
        })
      }));
  }

  getAssetCountByLocation(): Observable<any> {
    return this.http.get(this.assetCountByLocationApiUrl).pipe(
      map((response: any) => {
        return response.map(item => {
          return this.assetCountAdapter.adapt(item)
        })
      })
    )
  }

  getAssetLocations(): Observable<any> {
    return this.http.get(this.assetLocationsApiUrl)
  }

  // To get the details of the assets with the recent location.
  getAssetTrackingDetails(): Observable<any> {
    return this.http.get(this.assetTrackingDetailsApiUrl)
  }

  getLocationsImages(): Observable<any> {
    let assetImagesUrl = 'appdata/asset-location.json';
    return this.http.get(assetImagesUrl)
  }



  getLocationMappingList(): Observable<any> {
    return this.http.get(this.locationMappingListAPIUrl)
  }

  addLocationMapping(data: LocationMapping): Observable<any> {
    return this.http.post(this.locationMappingAddingListAPIUrl, data)
  }

  addAssets(data: assetmodel): Observable<any> {
    return this.http.post(this.addAssetsAPIUrl, data)
  }

  deleteAssets(data: assetmodel): Observable<any> {
    data['status'] = "0";
    return this.http.post(this.addAssetsAPIUrl, data)
  }
}
