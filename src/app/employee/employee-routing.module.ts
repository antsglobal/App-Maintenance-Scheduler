import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AntsvaluesComponent } from './antsvalues/antsvalues.component';
import { CareergrowthComponent } from './careergrowth/careergrowth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HrManagerComponent } from './hr-manager/hr-manager.component';
import { EmployeeComponent } from './employee.component';
import { EmployeecontributionComponent } from './employeecontribution/employeecontribution.component';
import { GoalsettingComponent } from './goalsetting/goalsetting.component';
import { ManagerratingComponent } from './managerrating/managerrating.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserUploadComponent } from './user-upload/user-upload.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    children: [
      {
        path: '',
        redirectTo: 'GoalsettingComponent',
        pathMatch: 'full'
      },
      {
        path: 'hrmanager',
        component: HrManagerComponent
      },
      {
        path: 'goalsetting',
        component: GoalsettingComponent
      },
      {
        path: 'employeecontribution',
        component: EmployeecontributionComponent
      },
      {
        path: 'antsvalues',
        component: AntsvaluesComponent
      },
      {
        path: 'careergrowth',
        component: CareergrowthComponent
      },
      {
        path: 'managerrating',
        component: ManagerratingComponent
      },
      {
        path: 'scoreboard',
        component: ScoreboardComponent
      },
      {
        path: 'profile',
        component: UserProfileComponent
      },
      {
        path: 'userupload',
        component: UserUploadComponent
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
