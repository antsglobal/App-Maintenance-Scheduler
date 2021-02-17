import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee.component';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { GoalsettingComponent } from './goalsetting/goalsetting.component';
import { EmployeecontributionComponent } from './employeecontribution/employeecontribution.component';
import { AntsvaluesComponent } from './antsvalues/antsvalues.component';
import { CareergrowthComponent } from './careergrowth/careergrowth.component';
import { ManagerratingComponent } from './managerrating/managerrating.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { TopmenuComponent } from './topmenu/topmenu.component';
import { ProfileComponent } from './profile/profile.component';
import { HrManagerComponent } from './hr-manager/hr-manager.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { RequestOTPComponent } from './request-otp/request-otp.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [DashboardComponent, EmployeeComponent, GoalsettingComponent, EmployeecontributionComponent, AntsvaluesComponent, CareergrowthComponent, ManagerratingComponent, ScoreboardComponent, SidemenuComponent, TopmenuComponent, ProfileComponent, HrManagerComponent, RequestOTPComponent, ResetPasswordComponent, UserProfileComponent],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    EmployeeRoutingModule,
    FormsModule,
    ChartsModule
  ]
})
export class EmployeeModule { }
