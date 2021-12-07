import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceConstants } from '../constants/ServiceConstants';
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

  constructor(private http: HttpClient) { }

  login(credentials: UserModel): Observable<string> {
    return this.http.post<string>(this.assetLoginApiUrl, credentials);
  }
}
