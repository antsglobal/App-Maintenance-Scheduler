import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceConstants } from '../constants/ServiceConstants';
import { EnvironmentConfig, ENV_CONFIG } from 'src/environments/environment-config.interface';
import { PaginationModel } from '../models/commonmodel';

@Injectable({
  providedIn: 'root'
})
export class IotDeviceMappingServiceService {

  apiBaseUrl
  iotDeviceMappingListApiUrl = '/loader-driller-info';
  mangeIotDeviceMappingListApiUrl = '/device';
   
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

  public getIotDeviceMappingList(): Observable<any[]> {
    return this.http.get<any[]>(
      this.apiBaseUrl + ServiceConstants.baseurlv1 + this.iotDeviceMappingListApiUrl,
      this.httpOptions
    );
  }

  public manageIotDeviceMappingList(input): Observable<any[]> {
    return this.http.post<any[]>(
      this.apiBaseUrl + ServiceConstants.baseurlv1 + this.mangeIotDeviceMappingListApiUrl, input,
      this.httpOptions
    );
  }
}
