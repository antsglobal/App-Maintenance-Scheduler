import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { goalsettingmodel } from 'src/app/models/goalsettingmodel';
import { EmployeeContributionService } from 'src/app/services/employee-contribution.service';
import { GlobalConstants } from 'src/app/variables/globalvariables';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-goalsetting',
  templateUrl: './goalsetting.component.html',
  providers: [EmployeeContributionService],
  styleUrls: ['./goalsetting.component.css']
})

export class GoalsettingComponent implements OnInit {
  public SNo: string;
  public Name: string;
  public EmailId: string;
  public errorMessage: string;
  refPeriodId: string;
  refEmployee: string;
  goal1: goalsettingmodel[] = [];
  goalsettingenabled: boolean=false;
  selfassessmentenabled: boolean=false;
  managerreviewenabled: boolean=false;

  constructor(private goalService: EmployeeContributionService) { }

  goalData = new MatTableDataSource<goalsettingmodel>(this.goal1);
  displayedColumns = ['okrDescription', 'quantitativeMeasure', 'qualitativeMeasure', 'descriptionOfMeasure','assessmentId', 'managerComments',  'addRow'];

  ngOnInit() {
    this.GetData(sessionStorage.getItem("periodId"), sessionStorage.getItem("employeeId"), sessionStorage.getItem("loggedInemployeeId"));    
  }
  
  updateEmployeeData(event) {
    this.GetData(sessionStorage.getItem("periodId"), sessionStorage.getItem("employeeId"), sessionStorage.getItem("loggedInemployeeId"));
  }

  GetData(periodId: string, employeeId: string, userId: string): void {
    let count : number=0;
    if (periodId != null && employeeId != null) {
      const newGoal: goalsettingmodel = { periodId, employeeId, userId } as goalsettingmodel;
      this.goalService.getGoalSetting(newGoal).toPromise().then(
         (goalRecords) => { 
          this.goal1 = goalRecords['data'];
          if (goalRecords && goalRecords['data'] && goalRecords['data'][0]) {
            this.refPeriodId = goalRecords['data'][0].periodId;
            this.refEmployee = goalRecords['data'][0].employeeId;
            count=Object.keys(goalRecords['data']).length;
          }
          for (let i = 0; i < 1-count; i++) {
            this.goal1.push(this.createNewRow());
          }          
          this.goalData.data = this.goal1;
          this.goalsettingenabled=goalRecords['goalSetting'];
          this.selfassessmentenabled=goalRecords['selfAssessment'];
          this.managerreviewenabled=goalRecords['managerReview'];
          if(employeeId!= sessionStorage.getItem("loggedInemployeeId"))
          {
            this.goalsettingenabled=false;
            this.selfassessmentenabled=false;
          }
          if(employeeId== sessionStorage.getItem("loggedInemployeeId"))
          {
            this.managerreviewenabled=false;
          }
        }        
      )
    }    
  }

  createGoalSetting() {
    this.InsertGoalSetting();
  }

  InsertGoalSetting() {
    const newEmp: goalsettingmodel[] = this.goalData.data as goalsettingmodel[];
    console.log(this.goalData.data);
    this.goalService.insertGoalSetting(this.goalData.data).subscribe(
      (response) => {
        if (response) {
          window.alert(response['message']);
        }
      },
      (error) => { }
    );
  }

  createNewRow(): goalsettingmodel {
    return {
      okrDescription: "",
      quantitativeMeasure: "",
      qualitativeMeasure: "",
      descriptionOfMeasure: "",
      managerComments: "",
      assessmentId: "",
      employeeId: sessionStorage.getItem("employeeId"),
      periodId: sessionStorage.getItem("periodId"),
      userId: "",
    };
  }

  // Adds new user.
  addRow() {
    if(sessionStorage.getItem("employeeId") == sessionStorage.getItem("loggedInemployeeId") && (this.selfassessmentenabled == true || this.goalsettingenabled == true || this.managerreviewenabled == true))
    {
      this.goalData.data.push(this.createNewRow());
      this.goalData.filter = "";
    }
  }

  removeRow() {
    if(sessionStorage.getItem("employeeId") == sessionStorage.getItem("loggedInemployeeId") && (this.selfassessmentenabled == true || this.goalsettingenabled == true || this.managerreviewenabled == true))
    {
      this.goalData.data.pop();
      this.goalData.filter = "";
    }
  }

}


