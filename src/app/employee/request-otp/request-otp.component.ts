import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/guest/login/login.component';
import { usermodel } from 'src/app/models/usermodel';
import { UserService } from 'src/app/Services/UserService';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-request-otp',
  templateUrl: './request-otp.component.html',
  styleUrls: ['./request-otp.component.css']
})
export class RequestOTPComponent implements OnInit {
  public emailid: string;
  public otp: string;
  private resetpasswordComponent = ResetPasswordComponent;
  constructor(public dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
  }

  requestOTP() {
    const newUser: usermodel = {
      email: this.emailid
    } as usermodel;

    this.userService
      .forgotpassword(newUser)
      .toPromise()
      .then(
        (response) => {
          window.alert(response['message']);
        },
        (error) => {
          window.alert('Invalid Credentials');
        }
      );
  }

  validateOTP(){
    const newUser: usermodel = {
      email: this.emailid,
      otp: this.otp
    } as usermodel;

    this.userService
      .validateOTP(newUser)
      .toPromise()
      .then(
        (response) => {
          if(response['message'] == "OTP Verified successfully")
          {
            sessionStorage.setItem('emailId', this.emailid.toString());
            console.log(this.emailid.toString());
            this.dialog.open(this.resetpasswordComponent, {
              data: { },
            });
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
