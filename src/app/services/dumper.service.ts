import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { dumpermodel, DumperStatus } from '../models/dumpermodel';
import { ServiceConstants } from '../constants/ServiceConstants';

@Injectable({
  providedIn: 'root'
  
})

export class DumperService {

  private dumperDetailsUrl = '/dumperdetailscount';
  private tripDurationUrl = '/durationofthetrip';
  private dumperIdsUrl = '/alldumperids';
  private dumperStatusUrl = '/dumperLiveLocation';
  private tripDetailsUrl = '';

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  public getDumperDetails(dumperModel: dumpermodel): Observable<dumpermodel[]> {
    return this.http.post<dumpermodel[]>(
      ServiceConstants.baseurlv1 + this.dumperDetailsUrl,
      dumperModel, this.httpOptions
    );
  }

  public getTripDuration(dumperModel: dumpermodel): Observable<dumpermodel[]> {
    return this.http.post<dumpermodel[]>(
      ServiceConstants.baseurlv1 + this.tripDurationUrl,
      dumperModel, this.httpOptions
    );
  }

  getDumperIds(dumper: dumpermodel
  ): Observable<dumpermodel[]> {
    return this.http.get<dumpermodel[]>(
      ServiceConstants.baseurlv1 + this.dumperIdsUrl
    );
  }

  getDumperStatus(dumperId): Observable<DumperStatus[]> {
    return this.http.post<DumperStatus[]>(ServiceConstants.baseurlv1 + this.dumperStatusUrl, dumperId);
  }

  getTripDetails(): Observable<dumpermodel[]> {
    return this.http.get<dumpermodel[]>(ServiceConstants.baseurlv1 + this.tripDetailsUrl);
  }

}