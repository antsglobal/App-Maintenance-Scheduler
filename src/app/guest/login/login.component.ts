import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../Services/UserService';
import { usermodel } from '../../models/usermodel';
import { GlobalConstants } from 'src/app/variables/globalvariables';
import { RequestOTPComponent } from 'src/app/employee/request-otp/request-otp.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  inputUserName: string;
  inputPassword: string;
  responseModel: usermodel;
  private editRequestComponent = RequestOTPComponent;
  
  constructor(private userService: UserService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Email Id is requried';
    }
    return this.email.hasError('email') ? 'Invalid Email Id' : '';
  }
  getPasswordErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Password is requried';
    }
  }

  login() {
    const newUser: usermodel = {
      email: this.inputUserName,
      password: this.inputPassword
    } as usermodel;

    this.userService
      .login(newUser)
      .toPromise()
      .then(
        (response) => {
          if (response) {
            if (
              response['message'].toLowerCase() ==
              'employee logged in successfully'
            ) {
              this.responseModel = response['data'];
              sessionStorage.setItem('name', this.responseModel.employeeName.toString());
              sessionStorage.setItem("loggedInemployeeId", this.responseModel.employeeId);
              sessionStorage.setItem("loggedInRole", this.responseModel.role);
              sessionStorage.setItem("emailId", this.responseModel.email);

              console.log(response['data']);
              console.log(this.responseModel.isFirstTimeLogin);
              if(this.responseModel.isFirstTimeLogin.toString() == 'true')
              {
                this.router.navigate(['/employee/goalsetting']);
              }
              else if(this.responseModel.isFirstTimeLogin.toString() == 'false')
              {
                this.dialog.open(this.editRequestComponent, {
                  data: { },
                });
              }

            } else {
              window.alert(response['message']);
            }
          }
        },
        (error) => {
          window.alert('Invalid Credentials');
        }
      );
  }

  forgotpassword(){
    this.dialog.open(this.editRequestComponent, {
      data: { },
    });
  }
}
