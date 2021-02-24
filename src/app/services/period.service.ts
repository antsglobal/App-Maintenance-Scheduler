import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceConstants } from '../Constants/ServiceConstants';
import { usermodel } from '../models/usermodel';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  createPeriodApiUrl = '/createperiod';
  getActivePeriodApiUrl = '/getallactiveperiods';
  getActiveAllPeriodApiUrl = '/getallperiods';
  getClosedPeriodApiUrl = '/getallclosedperiods';
  updatePeridApiUrl = '/updateperiod';
  periodAccessApiUrl= '/createperiodaccess';
  periodAccessIdApiUrl ="/getperiodaccessbyperiodidandactivity ";
  getEmployeesURL ="/getemployeebyrole ";
  relasePeriodURL ="/updatereleaseperiod ";
  constructor(public httpClient: HttpClient) { }

  public createPeriod(userModel: usermodel): Observable<string> { 
    return this.httpClient.post<string>(
      ServiceConstants.baseurlv2 + this.createPeriodApiUrl,
      userModel
    );
  }
  public getPeriods(userModel: usermodel): Observable<string> { 
    return this.httpClient.post<string>(
      ServiceConstants.baseurlv1 + this.getActivePeriodApiUrl,
      userModel
    );
  }

  public getAllPeriods(userModel: usermodel): Observable<string> { 
    return this.httpClient.post<string>(
      ServiceConstants.baseurlv2 + this.getActiveAllPeriodApiUrl,
      userModel
    );
  }

  public getEmployees(userModel: usermodel): Observable<string> { 
    return this.httpClient.post<string>(
      ServiceConstants.baseurlv1 + this.getEmployeesURL,
      userModel
    );
  }

  public getClosedPeriods(userModel: usermodel): Observable<string> { 
    return this.httpClient.post<string>(
      ServiceConstants.baseurlv2 + this.getClosedPeriodApiUrl,
      userModel
    );
  }

  public updatePeriod(userModel: usermodel): Observable<string> { 
    return this.httpClient.post<string>(
      ServiceConstants.baseurlv2 + this.updatePeridApiUrl,
      userModel
    );
  }

  public releasePeriod(userModel: usermodel): Observable<string> { 
    return this.httpClient.post<string>(
      ServiceConstants.baseurlv2 + this.relasePeriodURL,
      userModel
    );
  }

  public PeriodAccess(userModel: usermodel): Observable<string> { 
    return this.httpClient.post<string>(
      ServiceConstants.baseurlv2 + this.periodAccessApiUrl,
      userModel
    );
  }

  public GetPeriodAccessById(userModel: usermodel): Observable<string> { 
    return this.httpClient.post<string>(
      ServiceConstants.baseurlv2 + this.periodAccessIdApiUrl,
      userModel
    );
  }
  
}
