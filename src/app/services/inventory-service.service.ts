import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { dumpermodel, DumperStatus } from '../models/dumpermodel';
import { ServiceConstants } from '../constants/ServiceConstants';
import { EnvironmentConfig, ENV_CONFIG } from 'src/environments/environment-config.interface';
import { PaginationModel } from '../models/commonmodel';

@Injectable({
  providedIn: 'root'
})
export class InventoryServiceService {
  apiBaseUrl
  departmentStockListApiUrl = '/department-stock';

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


  public getDepartmentStockList(input: PaginationModel): Observable<any[]> {
    return this.http.post<any[]>(
      this.apiBaseUrl + ServiceConstants.baseurlv2 + this.departmentStockListApiUrl, input,
      this.httpOptions
    );
  }
}
