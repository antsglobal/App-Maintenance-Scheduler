import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { usermodel } from 'src/app/models/usermodel';
import { UserService } from 'src/app/Services/UserService';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public newpassword : string;
  public confirmpassword: string;
  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  submit(){
    const newUser: usermodel = {
      email: sessionStorage.getItem('emailId'),
      password: this.newpassword
    } as usermodel;

    console.log(sessionStorage.getItem('emailId'));

    this.userService
      .ResetPassword(newUser)
      .toPromise()
      .then(
        (response) => {
          if(response['message'] == "Employee Password changed successfully")
          {
            window.alert(response['message']);
            this.dialog.closeAll();
          }
          else{
            window.alert(response['message']);
          }          
        },
        (error) => {
          window.alert('Invalid Credentials');
        }
      );
  }
}
