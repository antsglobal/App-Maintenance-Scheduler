import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetsComponent } from './assets.component';
import { AuthorizeGuard } from '../guards/authorize.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DumperDetailsComponent } from './dumper-details/dumper-details.component';
import { TripDurationComponent } from './trip-duration/trip-duration.component';
import { DumperStatusComponent } from './dumper-status/dumper-status.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssetMovementComponent } from './asset-movement/asset-movement.component';
import { AssetSummaryComponent } from './asset-summary/asset-summary.component';
import { AssetTrackingComponent } from './asset-tracking/asset-tracking.component';
import { AssetRegistrationComponent } from './asset-registration/asset-registration.component';
import { LocationMappingComponent } from './location-mapping/location-mapping.component';
import { MqttPulisherComponent } from './mqtt-pulisher/mqtt-pulisher.component';
import { DrilingComponent } from './maintenence-schedular/utilization/driling/driling.component';
import { WarehouseComponent } from './maintenence-schedular/inventory/warehouse/warehouse.component';
import { DepartmentComponent } from './maintenence-schedular/inventory/department/department.component';
import { IotDeviceMappingComponent } from './maintenence-schedular/iot-device-mapping/iot-device-mapping.component';

const routes: Routes = [
  {
    path: '',
    component: AssetsComponent,
    children: [
      {
        path: '',
        redirectTo: 'assetsummary',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthorizeGuard]
      },
      {
        path: 'dumperdetails',
        component: DumperDetailsComponent,
        canActivate: [AuthorizeGuard]
      },
      {
        path: 'tripduration',
        component: TripDurationComponent,
        canActivate: [AuthorizeGuard]
      },
      {
        path: 'dumperstatus',
        component: DumperStatusComponent,
        canActivate: [AuthorizeGuard]
      },
      {
        path: 'assetmovement',
        component: AssetMovementComponent,
        canActivate: [AuthorizeGuard]
      },
      {
        path: 'assetsummary',
        component: AssetSummaryComponent,
        canActivate: [AuthorizeGuard]
      },
      {
        path: 'assettracking',
        component: AssetTrackingComponent,
        canActivate: [AuthorizeGuard]
      }
      ,
      {
        path: 'assetregistration',
        component: AssetRegistrationComponent,
        canActivate: [AuthorizeGuard]
      },
      {
        path: 'locationmapping',
        component: LocationMappingComponent,
        canActivate: [AuthorizeGuard]
      },
      {
        path: 'driller',
        component: DrilingComponent,
        canActivate: [AuthorizeGuard]
      },
      {
        path: 'loader',
        component: DrilingComponent,
        canActivate: [AuthorizeGuard]
      },
      {
        path: 'iot-device-mapping',
        component: IotDeviceMappingComponent,
        canActivate: [AuthorizeGuard]
      },
      {
        path: 'inventory/warehouse',
        component: DepartmentComponent,
        canActivate: [AuthorizeGuard]
      },
      {
        path: 'inventory/department',
        component: DepartmentComponent,
        canActivate: [AuthorizeGuard]
      },
      // {
      //   path: 'pusblish',
      //   component: MqttPulisherComponent,
      //   canActivate: [AuthorizeGuard]
      // }
      // /assets/pusblish
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetsRoutingModule { }
