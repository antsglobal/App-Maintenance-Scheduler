import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceConstants } from '../constants/ServiceConstants';
import { DashboardDataAdapter, DevicesCountAdapter, RecentTripDataAdapter } from '../models/dashboardmodel';
import { map } from 'rxjs/operators';
import { DashboardDate } from '../models/dashboarddatamodel ';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private dashboardWidgetsApiUrl = ServiceConstants.baseurlv1 + '/dashboard';
  private recentTripsApiUrl = ServiceConstants.baseurlv1 + '/recenttrips';
  private devicesCountApiUrl = ServiceConstants.baseurlv1 + '/countofshovelsdumpers';

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private _dDAapter: DashboardDataAdapter, private _rtAdapater: RecentTripDataAdapter,
    private _dcAdapter: DevicesCountAdapter
    ) { }

  getDashboardWidgetsData(data: DashboardDate): Observable<any> {
    return this.http.post(this.dashboardWidgetsApiUrl, data).pipe(
      map((response: any) => {
        return response['data'].map(item => {
          return this._dDAapter.adapt(item)
        })
      })
    );
  }

  getRecentTrips(): Observable<any> {
    return this.http.get(this.recentTripsApiUrl).pipe(
      map((response: any) => {
        return response.map(item => {
          return this._rtAdapater.adapt(item)
        })
      })
    )
  }

  getDevicesCount(): Observable<any> {
    return this.http.get(this.devicesCountApiUrl).pipe(
      map((response: any) => {
        return response.map(item => {
          return this._dcAdapter.adapt(item)
        })
      })
    )
  }

}
