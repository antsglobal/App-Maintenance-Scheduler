import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { dumpermodel, DumperStatus } from '../models/dumpermodel';
import { ServiceConstants } from '../constants/ServiceConstants';
import { EnvironmentConfig, ENV_CONFIG } from 'src/environments/environment-config.interface';
import { DeviceConstants } from '../constants/DeviceConstants';

@Injectable({
  providedIn: 'root'
  
})

export class DumperService {

  private dumperDetailsUrl = '/dumperdetailscount';
  private tripDurationUrl = '/durationofthetrip';
  private dumperIdsUrl = '/device-view';
  private dumperStatusUrl = '/dumperLiveLocation';
  private tripDetailsUrl = '';
  apiBaseUrl

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }),
  };

 constructor(
    private http: HttpClient,
    @Inject(ENV_CONFIG) private config: EnvironmentConfig
    ) { 
      this.apiBaseUrl = `${config.environment.apiUrl}`;
    }

  public getDumperDetails(dumperModel: dumpermodel): Observable<dumpermodel[]> {
    return this.http.post<dumpermodel[]>(
      this.apiBaseUrl + ServiceConstants.baseurlv1 + this.dumperDetailsUrl,
      dumperModel, this.httpOptions
    );
  }

  public getTripDuration(dumperModel: dumpermodel): Observable<dumpermodel[]> {
    return this.http.post<dumpermodel[]>(
      this.apiBaseUrl + ServiceConstants.baseurlv1 + this.tripDurationUrl,
      dumperModel, this.httpOptions
    );
  }

  getDeviceIds(category: string = DeviceConstants.dumper): Observable<dumpermodel[]> {
    return this.http.post<dumpermodel[]>(
      this.apiBaseUrl + ServiceConstants.baseurlv1 + this.dumperIdsUrl + `?deviceCatagory=${category}`, {}
    );
  }

  // To get the devices
  getDevices(dumper: dumpermodel): Observable<dumpermodel[]> {
    return this.http.post<dumpermodel[]>(this.apiBaseUrl + ServiceConstants.baseurlv1 + this.dumperStatusUrl, dumper);
  }

  getDumperStatus(dumperId): Observable<DumperStatus[]> {
    return this.http.post<DumperStatus[]>(this.apiBaseUrl + ServiceConstants.baseurlv1 + this.dumperStatusUrl, dumperId);
  }

  getTripDetails(): Observable<dumpermodel[]> {
    return this.http.get<dumpermodel[]>(this.apiBaseUrl + ServiceConstants.baseurlv1 + this.tripDetailsUrl);
  }

}