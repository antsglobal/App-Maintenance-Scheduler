import { Component, ElementRef, ViewChild } from '@angular/core';


import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SCCL';

  // private subscription: Subscription;
  // topicname: any;
  // msg: any;
  // isConnected: boolean = false;
  // @ViewChild('msglog', { static: true }) msglog: ElementRef;

  // constructor(private _mqttService: MqttService) { }

  // ngOnInit(): void {}

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }

  // subscribeNewTopic(): void {
  //   console.log('inside subscribe new topic')
  //   this.subscription = this._mqttService.observe(this.topicname).subscribe((message: IMqttMessage) => {
  //     this.msg = message;
  //     console.log('msg: ', message)
  //     this.logMsg('Message: ' + message.payload.toString() + '<br> for topic: ' + message.topic);
  //   });
  //   this.logMsg('subscribed to topic: ' + this.topicname)
  // }

  // sendmsg(): void {
  //   // use unsafe publish for non-ssl websockets
  //   this._mqttService.unsafePublish(this.topicname, this.msg, { qos: 1, retain: true })
  //   this.msg = ''
  // }
  
  // logMsg(message): void {
  //   this.msglog.nativeElement.innerHTML += '<br><hr>' + message;
  // }

  // clear(): void {
  //   this.msglog.nativeElement.innerHTML = '';
  // }

}
