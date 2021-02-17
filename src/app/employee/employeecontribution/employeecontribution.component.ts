import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { empcontributionmodel } from 'src/app/models/empcontributionmodel';
import { EmployeeContributionService } from 'src/app/services/employee-contribution.service';
import { GlobalConstants } from 'src/app/variables/globalvariables';

@Component({
  selector: 'app-employeecontribution',
  templateUrl: './employeecontribution.component.html',
  styleUrls: ['./employeecontribution.component.css']
})
export class EmployeecontributionComponent implements OnInit {
  public beyond1: string;
  public beyond2: string;
  public IHelped: string;
  public HelpedMe: string;
  public ErrorMessage: string;
  errorMessage: any;
  selfassessmentenabled: boolean=false;
  constructor(private employeeSerrvice: EmployeeContributionService) { }
  ngOnInit(): void {
    this.GetData(sessionStorage.getItem("periodId"), sessionStorage.getItem("employeeId"));
  }

  createEmpContribution(){  
    this.Insert(this.beyond1, this.beyond2, this.IHelped, this.HelpedMe, sessionStorage.getItem("periodId"), sessionStorage.getItem("employeeId"))
  }

  Insert(beyondTheScopeOfMyworkOne : string, beyondTheScopeOfMyworkTwo: string, iHelped : string, helpedMe : string, periodId:string, employeeId){
    const newEmp: empcontributionmodel = {
      beyondTheScopeOfMyworkOne,beyondTheScopeOfMyworkTwo, iHelped,
      helpedMe, periodId,employeeId,
    } as empcontributionmodel;

      this.employeeSerrvice.createEmpContribution(newEmp).subscribe(
        (response) => {
          if (response) {
            window.alert(response['message']);
          }
        },
        (error) => {}
      );     
  }

  GetData(periodId : string, employeeId : string): void {
    const newContri: empcontributionmodel = { periodId,employeeId } as empcontributionmodel;
    this.employeeSerrvice.getEmployeeContribution(newContri).subscribe({
      next: (goalRecords) => {
        console.log(goalRecords);
        if(goalRecords)
        {
          this.beyond1 = goalRecords['data'].beyondTheScopeOfMyworkOne;                
          this.beyond2 = goalRecords['data'].beyondTheScopeOfMyworkTwo;          
          this.IHelped = goalRecords['data'].iHelped;
          this.HelpedMe = goalRecords['data'].helpedMe;          
          this.selfassessmentenabled=goalRecords['selfAssessment'];
          if(employeeId!= sessionStorage.getItem("loggedInemployeeId"))
          {
            this.selfassessmentenabled=false;
          }
        }        
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}
