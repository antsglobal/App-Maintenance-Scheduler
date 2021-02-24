import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceConstants } from '../Constants/ServiceConstants';
import { usermodel } from '../models/usermodel';
import { fileUploadModel } from '../models/fileUploadModel';

@Injectable({ providedIn: 'root' })
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }),
  };

  
  loginApiUrl = '/signin';
  createPeriodApiUrl = '/createperiod';
  forgotpasswordApiUrl = '/forgotpassword';  
  validateotpApiUrl = '/validateotp';  
  resetPasswordApiUrl = '/resetpassword';  
  getEmployeeDataApiUrl = '/getemployeebyemail';  
  uploadFileAPI= '/uploademployeepmsfiles';
  downloadFileAPI= '/downloademployeepmsfiles';
  
  
  constructor(public httpClient: HttpClient) {}
  public login(loginModel: usermodel): Observable<string> {
    return this.httpClient.post<string>(
      ServiceConstants.baseurl + this.loginApiUrl,
      loginModel
    );
  }

  public forgotpassword(loginModel: usermodel): Observable<string> {
    return this.httpClient.post<string>(
      ServiceConstants.baseurlv1 + this.forgotpasswordApiUrl,
      loginModel
    );
  }

  public validateOTP(loginModel: usermodel): Observable<string> {
    return this.httpClient.post<string>(
      ServiceConstants.baseurlv1 + this.validateotpApiUrl,
      loginModel
    );
  }

  public ResetPassword(loginModel: usermodel): Observable<string> {
    return this.httpClient.post<string>(
      ServiceConstants.baseurlv1 + this.resetPasswordApiUrl,
      loginModel
    );
  }

  public GetUserData(loginModel: usermodel): Observable<string> {
    return this.httpClient.post<string>(
      ServiceConstants.baseurlv1 + this.getEmployeeDataApiUrl,
      loginModel
    );
  }

  public uploadFile(fileToUpload: File, periodId: string, empId: string): Observable<any> {
    //const fileUploadModel: fileUploadModel = {empId: empId, periodId: periodId, file: fileToUpload};
    const formData: FormData = new FormData();
    formData.append('employeeId', empId);
    formData.append('periodId', periodId);
    formData.append('file', fileToUpload, fileToUpload.name);  
    let response: any= this.httpClient.post<any>(
      ServiceConstants.baseurlv1 + this.uploadFileAPI,formData);
    console.log(response);
    return response;
  }

  public downloadFile(fileuplad: fileUploadModel): Observable<string> {
     let response: any= this.httpClient.post<string>(
     ServiceConstants.baseurlv1 + this.downloadFileAPI,fileuplad);
     console.log(response);
     return response;
  }
}












