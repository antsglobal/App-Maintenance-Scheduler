import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserModel } from 'src/app/models/usermodel';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  inputUserName: string;
  inputPassword: string;

  constructor(private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar, private userService: UserService) { }

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
    console.log(this.email.status, this.password.status);
    if (this.email.status == 'VALID' && this.password.status == 'VALID') {

      const loginDetails: UserModel = {
        userEmail: this.inputUserName,
        userPassword: this.inputPassword
      } as UserModel;

      this.userService.login(loginDetails).toPromise().then(response => {
        if (response) {
          console.log(response, response['status'], response['message'].toLowerCase())
          if (response['status'] == 'true' && response['message'].toLowerCase() == 'login succes') {
            let data = response['data'];
            sessionStorage.setItem("loggedInemployeeId", data.userId);
            sessionStorage.setItem("loggedInemployeeEmail", data.userEmail);
            sessionStorage.setItem("loggedInemployeeName", data.userName);
            if (data.userName == "Demo") {
              this.router.navigate(['/assets/assetsummary']);
            }
            else {
              this.router.navigate(['/assets/dashboard']);
            }

          }
        }
      }, (error) => {
        let message = "Please provide valid credentials to login."
        if (error.error && error.error['message']) {
          message = error.error['message']
        }
        this.snackBar.open(message, 'Ok', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'status-message'
        });
      })
    }
  }
}
