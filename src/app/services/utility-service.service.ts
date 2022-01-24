import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { dumpermodel, DumperStatus } from '../models/dumpermodel';
import { ServiceConstants } from '../constants/ServiceConstants';
import { EnvironmentConfig, ENV_CONFIG } from 'src/environments/environment-config.interface';

@Injectable({
  providedIn: 'root'
})
export class UtilityServiceService {

  apiBaseUrl
  utlityListApiUrl = '/replacement-view';
  replaceDevicePartApiUrl = '/replacement'

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient,
    @Inject(ENV_CONFIG) private config: EnvironmentConfig) {

    this.apiBaseUrl = `${config.environment.apiUrl}`;
  }


  public getUtilitiesList(category: string): Observable<dumpermodel[]> {
    return this.http.post<dumpermodel[]>(
      this.apiBaseUrl + ServiceConstants.baseurlv2Dev + this.utlityListApiUrl + `?deviceCategory=${category}`,
      this.httpOptions
    );
  }

  public replaceDevicePart(input): Observable<dumpermodel[]> {
    return this.http.post<dumpermodel[]>(
      this.apiBaseUrl + ServiceConstants.baseurlv2Dev + this.replaceDevicePartApiUrl, input,
      this.httpOptions
    );
  }
}
