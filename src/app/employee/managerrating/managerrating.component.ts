import { Component, OnInit } from '@angular/core';
import { managerobservationsmodel } from 'src/app/models/managerobservationsmodel';
import { managerratingsmodel } from 'src/app/models/managerratingsmodel';
import { EmployeeContributionService } from 'src/app/services/employee-contribution.service';

@Component({
  selector: 'app-managerrating',
  templateUrl: './managerrating.component.html',
  styleUrls: ['./managerrating.component.css']
})
export class ManagerratingComponent implements OnInit {  
  managerratings: managerratingsmodel[]=[];
  f1: string;
  f2: string;
  fc1: string;
  c1: string;
  c2: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  l1: string;
  l2: string;
  l3: string;

  acheivements: string;
  approch: string;
  strenths: string;
  aspects: string;
  errorMessage: any;
  managerreviewenabled: boolean=false;

  constructor(private employeeService : EmployeeContributionService) { }

  ngOnInit(): void {
    this.GetRatingsData(sessionStorage.getItem("periodId"), sessionStorage.getItem("employeeId"), sessionStorage.getItem("loggedInemployeeId"));
    this.GetObservationsData(sessionStorage.getItem("periodId"), sessionStorage.getItem("employeeId"), sessionStorage.getItem("loggedInemployeeId"));
  }
  
  GetRatingsData(periodId: string, employeeId: string, userId: string): void {
    if (periodId != null && employeeId != null) {
      const newratings: managerratingsmodel = { periodId, employeeId, userId } as managerratingsmodel;
      this.employeeService.getManagerRatings(newratings).subscribe({
        next: (ratingsdata) => {
          if (ratingsdata) {
            this.managerreviewenabled=ratingsdata['managerReview'];
            if(employeeId== sessionStorage.getItem("loggedInemployeeId"))
            {
              this.managerreviewenabled=false;
            }

            if (ratingsdata && ratingsdata['data'] && ratingsdata['data'][0]){
              this.f1=ratingsdata['data'][0].ratingId;
              this.f2=ratingsdata['data'][1].ratingId;
              this.fc1=ratingsdata['data'][2].ratingId;
              this.c1=ratingsdata['data'][3].ratingId;
              this.c2=ratingsdata['data'][4].ratingId;
              this.p1=ratingsdata['data'][5].ratingId;
              this.p2=ratingsdata['data'][6].ratingId;
              this.p3=ratingsdata['data'][7].ratingId;
              this.p4=ratingsdata['data'][8].ratingId;
              this.l1=ratingsdata['data'][9].ratingId;
              this.l2=ratingsdata['data'][10].ratingId;
              this.l3=ratingsdata['data'][11].ratingId;  
            }          
          }
        },
        error: (err) => (this.errorMessage = err),
      });
    }
  }

  GetObservationsData(periodId: string, employeeId: string, userId: string): void {
    if (periodId != null && employeeId != null) {
      const newratings: managerratingsmodel = { periodId, employeeId, userId } as managerratingsmodel;
      this.employeeService.getObservatonsRatings(newratings).subscribe({
        next: (ratingsdata) => {
          if (ratingsdata) {
            if (ratingsdata && ratingsdata['data']){
              this.acheivements=ratingsdata['data'].achievements;
              this.approch=ratingsdata['data'].approachToChallenge;
              this.strenths=ratingsdata['data'].keyStrength;
              this.aspects=ratingsdata['data'].improvement;
            }        

            this.managerreviewenabled=ratingsdata['managerReview'];
            if(employeeId== sessionStorage.getItem("loggedInemployeeId"))
            {
              this.managerreviewenabled=false;
            }
          }
        },
        error: (err) => (this.errorMessage = err),
      });
    }
  }

  createManagerratings()
  {
    this.managerratings=[];
    this.managerratings.push(this.createNewRow(1, this.f1, sessionStorage.getItem("periodId"), sessionStorage.getItem("employeeId"), sessionStorage.getItem("loggedInemployeeId")));
    this.managerratings.push(this.createNewRow(2, this.f2, sessionStorage.getItem("periodId"), sessionStorage.getItem("employeeId"), sessionStorage.getItem("loggedInemployeeId")));
    this.managerratings.push(this.createNewRow(3, this.fc1, sessionStorage.getItem("periodId"), sessionStorage.getItem("employeeId"), sessionStorage.getItem("loggedInemployeeId")));
    this.managerratings.push(this.createNewRow(4, this.c1, sessionStorage.getItem("periodId"), sessionStorage.getItem("employeeId"), sessionStorage.getItem("loggedInemployeeId")));
    this.managerratings.push(this.createNewRow(5, this.c2, sessionStorage.getItem("periodId"), sessionStorage.getItem("employeeId"), sessionStorage.getItem("loggedInemployeeId")));
    this.managerratings.push(this.createNewRow(6, this.p1, sessionStorage.getItem("periodId"), sessionStorage.getItem("employeeId"), sessionStorage.getItem("loggedInemployeeId")));
    this.managerratings.push(this.createNewRow(7, this.p2, sessionStorage.getItem("periodId"), sessionStorage.getItem("employeeId"), sessionStorage.getItem("loggedInemployeeId")));
    this.managerratings.push(this.createNewRow(8, this.p3, sessionStorage.getItem("periodId"), sessionStorage.getItem("employeeId"), sessionStorage.getItem("loggedInemployeeId")));
    this.managerratings.push(this.createNewRow(9, this.p4, sessionStorage.getItem("periodId"), sessionStorage.getItem("employeeId"), sessionStorage.getItem("loggedInemployeeId")));
    this.managerratings.push(this.createNewRow(10, this.l1, sessionStorage.getItem("periodId"), sessionStorage.getItem("employeeId"), sessionStorage.getItem("loggedInemployeeId")));
    this.managerratings.push(this.createNewRow(11, this.l2, sessionStorage.getItem("periodId"), sessionStorage.getItem("employeeId"), sessionStorage.getItem("loggedInemployeeId")));
    this.managerratings.push(this.createNewRow(12, this.l3, sessionStorage.getItem("periodId"), sessionStorage.getItem("employeeId"), sessionStorage.getItem("loggedInemployeeId")));
    this.Insert();
  }

  createManagerObservations(){
    this.InsertEmployeeObservations(this.acheivements, this.approch, this.strenths, this.aspects,  sessionStorage.getItem("periodId"), sessionStorage.getItem("employeeId"), sessionStorage.getItem("loggedInemployeeId"));
  }


  Insert(){
    console.log(this.managerratings);
    const newEmp: managerratingsmodel[] = this.managerratings as managerratingsmodel[];
      this.employeeService.insertManagerRatings(newEmp).subscribe(
        (response) => {
          if (response) {            
            window.alert(response['message']);
          }
        },
        (error) => {}
      );     
  }


  InsertEmployeeObservations(achievements: string, approachToChallenge: string, keyStrength: string , improvement : string, periodId: string, employeeId: string, userId: string){
    
    const newEmp: managerobservationsmodel = {
      achievements,approachToChallenge, keyStrength, improvement,
       periodId, employeeId
    } as managerobservationsmodel;
      this.employeeService.insertManagerObservations(newEmp).subscribe(
        (response) => {
          if (response) {            
            window.alert(response['message']);
          }
        },
        (error) => {}
      );     
  }
  createNewRow(orientationId: number, ratingId: string,periodId: string, employeeId: string, userId: string ): managerratingsmodel {   
    return {
      orientationId: orientationId,
      ratingId: ratingId,
      periodId: periodId,     
      employeeId: employeeId,  
      userId: userId,
      }
  }

}
