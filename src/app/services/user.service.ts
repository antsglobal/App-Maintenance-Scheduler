import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceConstants } from '../constants/ServiceConstants';
import { EnvironmentConfig, ENV_CONFIG } from 'src/environments/environment-config.interface';
import { UserModel } from '../models/usermodel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }),
  };

  private assetLoginApiUrl = ServiceConstants.baseurlv1 + '/login';
  apiBaseUrl

  constructor(
    private http: HttpClient,
    @Inject(ENV_CONFIG) private config: EnvironmentConfig
  ) {
    this.apiBaseUrl = `${config.environment.apiUrl}`;
  }

  login(credentials: UserModel): Observable<string> {
    console.log('working', this.assetLoginApiUrl)
    return this.http.post<string>(this.apiBaseUrl + this.assetLoginApiUrl, credentials);
  }
}
