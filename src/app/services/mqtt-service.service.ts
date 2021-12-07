import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceConstants } from '../constants/ServiceConstants';
// import { IMqttMessage, MqttService } from "ngx-mqtt";

@Injectable({
  providedIn: 'root'
})
export class MqttServiceService {

  private mqttDevicePublisherURL = 'http://assettracking.alpha-numero.com:8899/sccl/mqtt/api/ac';
  private endpoint: string;
  
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    // private _mqttService: MqttService,
    ) {
      this.endpoint = 'events';
  }

  // topic(device): Observable<IMqttMessage> {
  //   let topicName = `/${this.endpoint}/${device}`;     
  //   return this._mqttService.observe(topicName);
  // }
  
  public pusblisher(device): Observable<any[]> {
    return this.http.post<any[]>(
      this.mqttDevicePublisherURL,
      device, this.httpOptions
    );
  }
}
