import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MqttModule, IMqttServiceOptions } from "ngx-mqtt";
import { environment } from '../environments/environment';
import { HttpModule } from './http/http.module';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  password: "Ants@123",
  username: "ants_mqtt",
  hostname: '48eb834e5bfc48fdb7a8c21995b506ebs1.eu.hivemq.cloud',
  // clientId: "mqtt://48eb834e5bfc48fdb7a8c21995b506eb",
  port: 8883,
  // protocol: 'wss',
  // path: '/mqtt'
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ChartsModule,
    BackButtonDisableModule.forRoot(),
    HttpModule.forRoot({ environment }),
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    NgbModule,
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
