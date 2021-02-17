import { Component, OnInit } from '@angular/core';
import { empcontributionmodel } from 'src/app/models/empcontributionmodel';
import { EmployeeContributionService } from 'src/app/services/employee-contribution.service';
import { GlobalConstants } from 'src/app/variables/globalvariables';

@Component({
  selector: 'app-careergrowth',
  templateUrl: './careergrowth.component.html',
  styleUrls: ['./careergrowth.component.css']
})
export class CareergrowthComponent implements OnInit {
  start1 : string;
  start2 : string;
  stop1 : string;
  stop2 : string;
  continue1 : string;
  continue2 : string;
  learninggoal : string;
  learningmeasure : string;
  supportrequired : string;
  responsibitySelf : string;
  responsibilityManager : string;
  readinessSelf : string;
  readinessManager : string;
  errorMessage: any;
  selfassessmentenabled: boolean=false;

  constructor(private employeeService : EmployeeContributionService) { }

  ngOnInit(): void {
    this.GetData(sessionStorage.getItem("periodId"), sessionStorage.getItem("employeeId"));
    this.GetImprovementsData(sessionStorage.getItem("periodId"), sessionStorage.getItem("employeeId"));
  }

  createCareerGrowth(){  
    this.Insert(this.learninggoal,this.learningmeasure, this.supportrequired,
      this.responsibitySelf, this.responsibilityManager, this.readinessSelf, this.readinessManager, sessionStorage.getItem("periodId"), sessionStorage.getItem("employeeId"))
  }

  createImprovements(){  
    this.InsertImprovements(this.start1,this.stop1, this.continue1,
      this.start2, this.stop2, this.continue2, sessionStorage.getItem("periodId"), sessionStorage.getItem("employeeId"), sessionStorage.getItem("loggedInemployeeId"))
  }

  GetData(periodId : string, employeeId : string): void {
    const newContri: empcontributionmodel = { periodId,employeeId } as empcontributionmodel;
    this.employeeService.getCareerGrowth(newContri).subscribe({
      next: (goalRecords) => {
        if(goalRecords && goalRecords['data'])
        {
          this.learninggoal = goalRecords['data'].learningGoal;
          this.learningmeasure = goalRecords['data'].learningMeasure;
          this.supportrequired = goalRecords['data'].supportRequired;
          this.responsibitySelf = goalRecords['data'].roleEnrichSelf;
          this.responsibilityManager = goalRecords['data'].roleEnrichManager;
          this.readinessSelf = goalRecords['data'].roleReadinessSelf;
          this.readinessManager = goalRecords['data'].roleReadinessManager; 
        }
          this.selfassessmentenabled=goalRecords['selfAssessment'];
          if(employeeId!= sessionStorage.getItem("loggedInemployeeId"))
          {
            this.selfassessmentenabled=false;
          }
        
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  GetImprovementsData(periodId : string, employeeId : string): void {
    const newContri: empcontributionmodel = { periodId,employeeId } as empcontributionmodel;
    this.employeeService.getImprovements(newContri).subscribe({
      next: (goalRecords) => {
          if (goalRecords && goalRecords['data'])
          {
            this.start1 = goalRecords['data'].antsImprovementsStart;
            this.start2 = goalRecords['data'].selfImprovementsStart;
            this.stop1 = goalRecords['data'].antsImprovementsStop;
            this.stop2 = goalRecords['data'].selfImprovementsStop;
            this.continue1 = goalRecords['data'].antsImprovementsContinue;
            this.continue2 = goalRecords['data'].selfImprovementsContinue;
          }                   
          this.selfassessmentenabled=goalRecords['selfAssessment'];
          console.log(this.selfassessmentenabled);        
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  Insert(learningGoal : string, learningMeasure : string, supportRequired : string,
    roleEnrichSelf:string, roleEnrichManager: string, roleReadinessSelf: string, roleReadinessManager: string, periodId : string, employeeId: string ){
    const newEmp: empcontributionmodel = {
      learningGoal,learningMeasure, supportRequired,
      roleEnrichSelf, roleEnrichManager, roleReadinessSelf,roleReadinessManager, periodId, employeeId
    } as empcontributionmodel;

      this.employeeService.createCareerGrowth(newEmp).subscribe(
        (response) => {
          if (response) {
            window.alert(response['message']);
          }
        },
        (error) => {}
      );     
  }

  InsertImprovements(antsImprovementsStart : string, antsImprovementsStop : string, antsImprovementsContinue : string,
    selfImprovementsStart:string, selfImprovementsStop: string, selfImprovementsContinue: string, periodId : string, employeeId: string, userId: string ){
    const newEmp: empcontributionmodel = {
      antsImprovementsStart,antsImprovementsStop, antsImprovementsContinue,
      selfImprovementsStart, selfImprovementsStop, selfImprovementsContinue, periodId, employeeId, userId
    } as empcontributionmodel;

    console.log(antsImprovementsStart,antsImprovementsStop, antsImprovementsContinue,
      selfImprovementsStart, selfImprovementsStop, selfImprovementsContinue, periodId, employeeId);
      this.employeeService.createImprovements(newEmp).subscribe(
        (response) => {
          if (response) {
            window.alert(response['message']);
          }
        },
        (error) => {}
      );     
  }
}
