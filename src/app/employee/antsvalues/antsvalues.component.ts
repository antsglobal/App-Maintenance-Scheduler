import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { antsvaluesmodel } from 'src/app/models/antsvaluesmodel';
import { EmployeeContributionService } from 'src/app/services/employee-contribution.service';
import { GlobalConstants } from 'src/app/variables/globalvariables';

@Component({
  selector: 'app-antsvalues',
  templateUrl: './antsvalues.component.html',
  styleUrls: ['./antsvalues.component.css']
})
export class AntsvaluesComponent implements OnInit {
  antsvalue: antsvaluesmodel[]=[];
  antsValues1 : string="Quality";
  antsValues2 : string="Trust";
  antsValues3 : string="Respect";
  antsValues4 : string="Learning";
  q1 : string;
  t1 : string;
  r1 : string;
  l1 : string;
  q2 : string;
  t2 : string;
  r2 : string;
  l2 : string;
  q3 : string;
  t3 : string;
  r3 : string;
  l3 : string;
  q4 : string;
  t4 : string;
  r4 : string;
  l4 : string;
  errorMessage: any;
  selfassessmentenabled: boolean=false;

  constructor(private employeeService : EmployeeContributionService) { }

  ngOnInit(): void {
    this.GetData(sessionStorage.getItem("periodId"), sessionStorage.getItem("employeeId"));
  }

  createAntsValues()
  {
    this.antsvalue.push(this.createNewRow(this.antsValues1,this.q1,this.q2,this.q3,this.q4,sessionStorage.getItem("periodId"), sessionStorage.getItem("employeeId")));
    this.antsvalue.push(this.createNewRow(this.antsValues2,this.t1,this.t2,this.t3,this.t4,sessionStorage.getItem("periodId"), sessionStorage.getItem("employeeId")));
    this.antsvalue.push(this.createNewRow(this.antsValues3,this.r1,this.r2,this.r3,this.r4,sessionStorage.getItem("periodId"), sessionStorage.getItem("employeeId")));
    this.antsvalue.push(this.createNewRow(this.antsValues4,this.l1,this.l2,this.l3,this.l4,sessionStorage.getItem("periodId"), sessionStorage.getItem("employeeId")));
    this.Insert();
  }
  Insert(){   

    console.log( this.antsvalue);
    const newEmp: antsvaluesmodel[] = this.antsvalue as antsvaluesmodel[];
      this.employeeService.insertAntsValues(newEmp).subscribe(
        (response) => {
          if (response) {            
            window.alert(response['message']);
          }
        },
        (error) => {}
      );     
  }

  
  GetData(periodId: string, employeeId: string): void {
    if (periodId != null && employeeId != null) {
      const newGoal: antsvaluesmodel = { periodId, employeeId } as antsvaluesmodel;
      this.employeeService.getAntsValues(newGoal).subscribe({
        next: (antsvaluesdata) => {
          if (antsvaluesdata) {
            if (antsvaluesdata && antsvaluesdata['data'] && antsvaluesdata['data'][0])
            {
              this.q1=antsvaluesdata['data'][0].valueGrading;
              this.q2=antsvaluesdata['data'][1].recommendations;
              this.q3=antsvaluesdata['data'][2].empValues;
              this.q4=antsvaluesdata['data'][3].empSelf;

              this.t1=antsvaluesdata['data'][0].valueGrading;
              this.t2=antsvaluesdata['data'][1].recommendations;
              this.t3=antsvaluesdata['data'][2].empValues;
              this.t4=antsvaluesdata['data'][3].empSelf;

              this.r1=antsvaluesdata['data'][0].valueGrading;
              this.r2=antsvaluesdata['data'][1].recommendations;
              this.r3=antsvaluesdata['data'][2].empValues;
              this.r4=antsvaluesdata['data'][3].empSelf;

              this.l1=antsvaluesdata['data'][0].valueGrading;
              this.l2=antsvaluesdata['data'][1].recommendations;
              this.l3=antsvaluesdata['data'][2].empValues;
              this.l4=antsvaluesdata['data'][3].empSelf;    
            }
                    
            this.selfassessmentenabled=antsvaluesdata['selfAssessment'];
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

  createNewRow(a1: string, a2: string, a3: string,  a4 : string,  a5: string, a6 : string, a7: string  ): antsvaluesmodel {   
    return {
      antsValues: a1,
      valueGrading: a2,
      recommendations: a3,
      empValues: a4,
      empSelf: a5,
      periodId: a6,     
      employeeId: a7,  
      }
  }

}



