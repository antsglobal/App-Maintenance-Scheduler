import { Component, OnInit } from '@angular/core';
import { usermodel } from 'src/app/models/usermodel';
import { UserService } from 'src/app/Services/UserService';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  username = sessionStorage.getItem('name');
  errorMessage: any;
  constructor(private userService: UserService) { }
  public empId: string;
  public reportingManager: string;
  public managerId: string;
  public department: string;
  public designation: string;
  public doj: string;
  public projectName: string;
  public reason: string;

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    const newContri: usermodel = { email: sessionStorage.getItem('emailId') } as usermodel;
    this.userService.GetUserData(newContri).subscribe({
      next: (goalRecords) => {
        if(goalRecords)
        {
          console.log(goalRecords);
          this.empId = goalRecords['data'].employeeId;
          this.reportingManager = goalRecords['data'].reportingManager;
          this.managerId = goalRecords['data'].managerId;
          this.department = goalRecords['data'].department;
          this.designation = goalRecords['data'].designation;
          this.doj = goalRecords['data'].dateOfJoining;
          // this.projectName = goalRecords['data'].managerId;
          // this.reason = goalRecords['data'].managerId;

          // dateOfJoining: "2020-04-08"
          // department: "Software"
          // designation: "Sr. Software Engineer"
          // email: "kusuma.srikanth@alpha-numero.com"
          // employeeId: "AN165"
          // employeeName: "Srikanth Kusuma"
          // employeePhoneNumber: "9908191920"
          // isActive: true
          // isFirstTimeLogin: true
          // isManager: false
          // location: "Hyderabad"
          // managerId: "AN30"
          // reportingManager: "Rambabu Gilaka"
          // role: "Employee"
        }        
      },
      error: (err) => (this.errorMessage = err),
    });


  }

}
