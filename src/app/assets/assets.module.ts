import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsRoutingModule } from './assets-routing.module';
import { AssetsComponent } from './assets.component';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { TopmenuComponent } from './topmenu/topmenu.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { DumperDetailsComponent } from './dumper-details/dumper-details.component';
import { TripDurationComponent } from './trip-duration/trip-duration.component';
import { DumperStatusComponent } from './dumper-status/dumper-status.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecentTripsComponent } from './common/recent-trips/recent-trips.component';
import { TripAnalysisComponent } from './common/trip-analysis/trip-analysis.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { AssetTrackingAdapter, AssetLocationAdapter } from '../models/assettracking';
import { AssettRackingService } from '../services/assett-racking.service';
import { AssetHelper } from '../helpers/asset-helpers';
import { AssetMovementComponent } from './asset-movement/asset-movement.component';
import { AssetSummaryComponent } from './asset-summary/asset-summary.component';
import { TripDetailsComponent } from './common/trip-details/trip-details.component';
import { AssetTrackingComponent } from './asset-tracking/asset-tracking.component';
import { DashboardDataAdapter, DevicesCountAdapter, RecentTripDataAdapter } from '../models/dashboardmodel';
import { DashboardService } from '../services/dashboard.service';
import { DashboardHelper } from '../helpers/dashboard-helper';
import { AgmCoreModule } from '@agm/core';
import { AssetRegistrationComponent } from './asset-registration/asset-registration.component';
import { LocationMappingComponent } from './location-mapping/location-mapping.component';
import { AddAssetCodeComponent } from './add-asset-code/add-asset-code.component';
import { EditAssetCodeComponent } from './edit-asset-code/edit-asset-code.component';
import { CreateLocationComponent } from './location-mapping/create-location/create-location.component';
import { EditLocationComponent } from './location-mapping/edit-location/edit-location.component';
import { PopupMessageComponent } from './popup-message/popup-message.component';
import { ConfirmationDialogService } from '../services/confirmation-dialog.service';
import { MatCardModule } from '@angular/material/card';
import { MqttPulisherComponent } from './mqtt-pulisher/mqtt-pulisher.component';
import { MqttModule, MQTT_SERVICE_OPTIONS } from 'ngx-mqtt';
import { MqttServiceService } from '../services/mqtt-service.service';
// import { MqttSubscriberComponent } from './mqtt-subscriber/mqtt-subscriber.component';
// import { IMqttServiceOptions, MqttModule } from "ngx-mqtt";
// import { environment as env } from '../../environments/environment';
// import { MqttServiceService } from '../services/mqtt-service.service';

// const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
//   hostname: env.mqtt.server,
//   port: env.mqtt.port,
//   protocol: (env.mqtt.protocol === "wss") ? "wss" : "ws",
//   path: '',
// };

@NgModule({
  declarations: [
    AssetsComponent, SidemenuComponent, TopmenuComponent, ProfileComponent, UserProfileComponent, 
    PageNotFoundComponent, DumperDetailsComponent, TripDurationComponent, DumperStatusComponent, AssetMovementComponent, 
    AssetSummaryComponent, DashboardComponent, RecentTripsComponent, TripAnalysisComponent, TripDetailsComponent, 
    AssetTrackingComponent, AssetRegistrationComponent, LocationMappingComponent, AddAssetCodeComponent, EditAssetCodeComponent, 
    CreateLocationComponent, EditLocationComponent, PopupMessageComponent,
     MqttPulisherComponent, 
    // MqttSubscriberComponent
    ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDJhg4Ug-XDzrVG3gKCOxHdDDPt4fvZGjw'
    }),
    CommonModule,
    MaterialModule,
    MatIconModule,
    MatMomentDateModule,
    HttpClientModule,
    AssetsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    ChartsModule,
    MatCardModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
  ],
  providers: [
    AssetHelper,
    AssettRackingService,
    AssetTrackingAdapter,
    AssetLocationAdapter,
    DashboardHelper,
    DashboardService,
    DashboardDataAdapter,
    DevicesCountAdapter,
    RecentTripDataAdapter,
    ConfirmationDialogService,
    MqttServiceService
  ]
})
export class AssetsModule { }
