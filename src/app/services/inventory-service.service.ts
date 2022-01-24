import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceConstants } from '../constants/ServiceConstants';
import { EnvironmentConfig, ENV_CONFIG } from 'src/environments/environment-config.interface';
import { PaginationModel } from '../models/commonmodel';
import { StockModel } from '../assets/maintenence-schedular/inventory/manage-stock/manage-stock.component';

@Injectable({
  providedIn: 'root'
})
export class InventoryServiceService {
  apiBaseUrl
  departmentStockListApiUrl = '/department-stock-page';
  warehouseStockMovementApiUrl = '/warehouse-inventory-transactions';
  departmentStockMovementApiUrl = '/department-inventory-transactions';
  warehouseStockListApiUrl = '/warehouse-inventory';
  partTypesApiUrl = '/part-type';
  addWarehouseStockApiUrl = '/add-warehouse-inventory';  
  reifilDepStockApiUrl = '/refil-department-stock';
  
  
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
      this.apiBaseUrl + ServiceConstants.baseurlv2Dev + this.departmentStockListApiUrl, input,
      this.httpOptions
    );
  }

  public warehouseStockList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiBaseUrl + ServiceConstants.baseurlv2Dev + this.warehouseStockListApiUrl);
  }

  public getPartTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiBaseUrl + ServiceConstants.baseurlv2Dev + this.partTypesApiUrl);
  }

  public addWarehouseStock(input: StockModel): Observable<any[]> {
    return this.http.post<any[]>(
      this.apiBaseUrl + ServiceConstants.baseurlv2Dev + this.addWarehouseStockApiUrl, input
    );
  }

  public getWarehouseStockMovement(input: any) {
    return this.http.post<any[]>(
      this.apiBaseUrl + ServiceConstants.baseurlv2Dev + this.warehouseStockMovementApiUrl, input
    );
  }
  
  public getDepartmentStockMovement(input) {
    return this.http.post<any[]>(
      this.apiBaseUrl + ServiceConstants.baseurlv2Dev + this.departmentStockMovementApiUrl, input
    );
  }

  public refilDepStock(input) {
    return this.http.post<any[]>(
      this.apiBaseUrl + ServiceConstants.baseurlv2Dev + this.reifilDepStockApiUrl, input
    );
  }
}
