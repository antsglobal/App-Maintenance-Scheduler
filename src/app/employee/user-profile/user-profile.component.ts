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
  public band: string;
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
          this.empId = goalRecords['data'].employeeId;
          this.reportingManager = goalRecords['data'].reportingManager;
          this.managerId = goalRecords['data'].managerId;
          this.department = goalRecords['data'].department;
          this.designation = goalRecords['data'].designation;
          this.doj = goalRecords['data'].dateOfJoining;
          this.band = goalRecords['data'].band;
        }        
      },
      error: (err) => (this.errorMessage = err),
    });
  }  
}
