import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceConstants } from '../Constants/ServiceConstants';
import { empcontributionmodel } from '../models/empcontributionmodel';
import { goalsettingmodel } from '../models/goalsettingmodel';
import { antsvaluesmodel } from '../models/antsvaluesmodel';
import { managerratingsmodel } from '../models/managerratingsmodel';
import { managerobservationsmodel } from '../models/managerobservationsmodel';
import { scoreboardmodel } from '../models/scoreboardmodel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeContributionService {

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }),
  };
  createEmployeeContribution = '/createemployeecontribution';
  getemployeegoalsettingsbyperiod = '/getemployeegoalsettingsbyperiod';
  getemployeecontributionbyperiod = '/getemployeecontributionbyperiod';
  getcareerGrowth = '/getemployeelearningbyperiod';
  createcareerGrowth = '/createemployeelearning';
  createImprovementsAPI ='/createemployeeimprovements';
  getImprovementsAPI ='/getemployeeimprovementsbyperiod';
  createGoalSettingAPI ='/createemployeegoalsetting';
  getAssessmentsAPI ='/getassesments';
  createAntsValuesAPI ='/createemployeeantsvalues';
  getAntsValuesAPI ='/getemployeeantsvaluesbyperiod';
  insertmanagerRatingsAPI ='/createemployeeratingsbyperiod';
  insertEmployeeobservationsAPI ='/createemployeeobservations';
  getManagerRatingsAPI = '/getemployeeratingsbyperiod';
  getManagerObservationsAPI = '/getemployeeobservationsbyperiod';
  getScoreboardAPI= '/getemployeescoreboardvaluesbyperiod'

  createemployeeobservations

  constructor(public httpClient: HttpClient) { }

  public createEmpContribution(goalModel: empcontributionmodel): Observable<string> { 
    return this.httpClient.post<string>(
      ServiceConstants.baseurlv1 + this.createEmployeeContribution,
      goalModel
    );
  }

  public createCareerGrowth(goalModel: empcontributionmodel): Observable<string> { 
    return this.httpClient.post<string>(
      ServiceConstants.baseurlv1 + this.createcareerGrowth,
      goalModel
    );
  }

  public createImprovements(goalModel: empcontributionmodel): Observable<string> { 
    return this.httpClient.post<string>(
      ServiceConstants.baseurlv1 + this.createImprovementsAPI,
      goalModel
    );
  }

  public getGoalSetting(empModel: goalsettingmodel): Observable<string> { 
    return this.httpClient.post<string>(
      ServiceConstants.baseurlv1 + this.getemployeegoalsettingsbyperiod,
      empModel
    );
  }

  public getAssessments(empModel: goalsettingmodel): Observable<string> { 
    return this.httpClient.post<string>(
      ServiceConstants.baseurlv1 + this.getAssessmentsAPI,
      empModel
    );
  }

  public insertGoalSetting(empModel: goalsettingmodel[]): Observable<string> { 
    console.log(empModel);
    return this.httpClient.post<string>(
      ServiceConstants.baseurlv1 + this.createGoalSettingAPI,
      empModel
    );
  }

  public insertAntsValues(empModel: antsvaluesmodel[]): Observable<string> { 
    console.log(empModel);
    return this.httpClient.post<string>(
      ServiceConstants.baseurlv1 + this.createAntsValuesAPI,
      empModel
    );
  }

  public insertManagerRatings(empModel: managerratingsmodel[]): Observable<string> { 
    return this.httpClient.post<string>(
      ServiceConstants.baseurlv1 + this.insertmanagerRatingsAPI,
      empModel
    );
  }

  public insertManagerObservations(empModel: managerobservationsmodel): Observable<string> { 
    console.log(empModel);
    return this.httpClient.post<string>(
      ServiceConstants.baseurlv1 + this.insertEmployeeobservationsAPI,
      empModel
    );
  }  

  public getAntsValues(empModel: antsvaluesmodel): Observable<string> { 
    console.log(empModel);
    return this.httpClient.post<string>(
      ServiceConstants.baseurlv1 + this.getAntsValuesAPI,
      empModel
    );
  }

  public getEmployeeContribution(empModel: empcontributionmodel): Observable<string> { 
    return this.httpClient.post<string>(
      ServiceConstants.baseurlv1 + this.getemployeecontributionbyperiod,
      empModel
    );
  }
  

  public getCareerGrowth(empModel: empcontributionmodel): Observable<string> { 
    return this.httpClient.post<string>(
      ServiceConstants.baseurlv1 + this.getcareerGrowth,
      empModel
    );
  }

  public getImprovements(empModel: empcontributionmodel): Observable<string> { 
    return this.httpClient.post<string>(
      ServiceConstants.baseurlv1 + this.getImprovementsAPI,
      empModel
    );
  }

  public getManagerRatings(empModel: managerratingsmodel): Observable<string> { 
      return this.httpClient.post<string>(
      ServiceConstants.baseurlv1 + this.getManagerRatingsAPI,
      empModel
    );
  }

  public getObservatonsRatings(empModel: managerratingsmodel): Observable<string> { 
      return this.httpClient.post<string>(
      ServiceConstants.baseurlv1 + this.getManagerObservationsAPI,
      empModel
    );
  }

  public getScoreboard(scoreModel: scoreboardmodel): Observable<string> { 
    return this.httpClient.post<string>(
    ServiceConstants.baseurlv1 + this.getScoreboardAPI,
    scoreModel
  );
}

}
