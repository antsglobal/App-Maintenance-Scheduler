import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PeriodService } from 'src/app/services/period.service';
import { usermodel } from '../../models/usermodel';

@Component({
  selector: 'app-hr-manager',
  templateUrl: './hr-manager.component.html',
  styleUrls: ['./hr-manager.component.css']
})
export class HrManagerComponent implements OnInit {
  
  period: any;
  getPeriods: any;
  openperiodid : string;
  closeperiodid : string;
  releaseperiodid: string;
  getClosedPeriods : any;
  public periodname: string;
  gfrom: string;
  gto: string;
  sfrom: string;
  sto: string;
  mfrom: string;
  mto: string;
  gperiod : string;
  speriod : string;
  mperiod : string;

  gtoMinDate: string;
  mtoMinDate: string;
  stoMinDate: string;

  gtoDisable: boolean = true;
  mtoDisable: boolean = true;
  stoDisable: boolean = true;

  gSave: boolean = true;
  mSave: boolean = true;
  sSave: boolean = true;

  errorMessage: string;

  constructor(
     private periodService: PeriodService
    ) { }

 


  ngOnInit(): void {
    this.GetPeriods();
    this.GetClosedPeriods();

  }


   GetPeriods(): void {
    const newperiod: usermodel = {  } as usermodel;
    this.periodService.getPeriods(newperiod).subscribe({
      next: (periods) => {
        console.log(periods);
        this.period = periods['data'];
        this.getPeriods = this.period;
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  GetClosedPeriods(): void {
    const newperiod: usermodel = {  } as usermodel;
    this.periodService.getClosedPeriods(newperiod).subscribe({
      next: (periods) => {
        console.log(periods);
        this.period = periods['data'];
        this.getClosedPeriods = this.period;
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  createPeriod(){
    this.Insert(this.periodname, false)  
  }

  Insert(periodId : string, isActive : boolean ){
    const newPeriod: usermodel = {
      periodId,
      isActive,
    } as usermodel;
    this.periodService.createPeriod(newPeriod).subscribe(
      (response) => {
        if (response) {
          window.alert(response['message']);
          this.periodname="";
          this.GetPeriods();
          this.GetClosedPeriods();
        }
      },
      (error) => {}
    );  
  }

  openPeriod(){
    this.updatePeriod(this.openperiodid, true)  
  }

  closePeriod(){
    this.updatePeriod(this.closeperiodid, false)  
  }

  relasePeriod(){
    this.releasePeriodId(this.releaseperiodid, true)  
  }

  updatePeriod(periodId : string, isActive : boolean ){
    const newPeriod: usermodel = {
      periodId,
      isActive,
    } as usermodel;
    this.periodService.updatePeriod(newPeriod).subscribe(
      (response) => {
        if (response) {
          window.alert(response['message']);
          this.periodname="";
          this.GetPeriods();
          this.GetClosedPeriods();
        }
      },
      (error) => {}
    );  
  }

  releasePeriodId(periodId : string, releasePeriod : boolean ){
    const newPeriod: usermodel = {
      periodId,
      releasePeriod,
    } as usermodel;
    this.periodService.releasePeriod(newPeriod).subscribe(
      (response) => {
        if (response) {
          window.alert(response['message']);
          this.releaseperiodid="";
          this.GetPeriods();
        }
      },
      (error) => {}
    );  
  }

  PeriodAccess(activity : string, fromDate : string,toDate : string,periodId : string){
    const newPeriod: usermodel = {
      periodId,      
      fromDate, toDate, activity
    } as usermodel;
    this.periodService.PeriodAccess(newPeriod).subscribe(
      (response) => {
        if (response) {
          window.alert(response['message']);
        }
      },
      (error) => {}
    );  
  }

  savegoal(){    
    console.log(this.gfrom);
    this.PeriodAccess("Goal Setting", this.gfrom,this.gto,this.gperiod);
  }
  saveself(){
    this.PeriodAccess("Self Assessment", this.sfrom,this.sto,this.speriod);
  }
  savemanager(){
    this.PeriodAccess("Manager Review", this.mfrom,this.mto,this.mperiod);
  }

  ongperiodChange(){
    this.getPeriodAccessByID(this.gperiod,"Goal Setting");
  }
  onsperiodChange(){
    this.getPeriodAccessByID(this.speriod,"Self Assessment");
  }
  onmperiodChange(){
    this.getPeriodAccessByID(this.mperiod,"Manager Review");
  }

  getPeriodAccessByID(periodId: string, activity: string){
    const newPeriod: usermodel = {
      periodId,      
       activity
    } as usermodel;
    this.periodService.GetPeriodAccessById(newPeriod).subscribe(
      (response) => {
        if (response) {
          if(activity=="Goal Setting")
          {
            this.gfrom=response['data'].fromDate;
            this.gto=response['data'].toDate;
            if (this.gfrom !== undefined)
                this.setMinDate();
          }
          else if(activity=="Self Assessment")
          {
            this.sfrom=response['data'].fromDate;
            this.sto=response['data'].toDate;
            if (this.sfrom !== undefined)
              this.setMinDate('s');
          }
          else if(activity=="Manager Review")
          {
            this.mfrom=response['data'].fromDate;
            this.mto=response['data'].toDate;
            if (this.mfrom !== undefined)
              this.setMinDate('m');
          }
        }
      },
      (error) => {}
    ); 
  }


 setMinDate(activity = 'g', clearToDate = false) {
    switch(activity) {
      case 'g':
        this.gtoMinDate = this.gfrom;
        if (clearToDate){
          this.gto = '';
        }
        // else if (this.gto != '' && this.gfrom != '')
        //   this.gSave = true;
        // console.log(typeof this.gto, typeof this.gfrom)
        // console.log( this.gto,  this.gfrom)
        this.gtoDisable = false;
        break;
      case 'm':
        this.mtoMinDate = this.mfrom;
        if (clearToDate){
          this.mto = '';
        }
        // else if (this.mto != '' && this.mfrom != '')
        //   this.mSave = true;
        // console.log(typeof this.mto, typeof this.mfrom, )
        this.mtoDisable = false;
        break;
      case 's':
        this.stoMinDate = this.sfrom;
        if (clearToDate) {
          this.sto = '';
        }
        // else if (this.sto != '' && this.sfrom != '')
        //   this.sSave = true;
        // console.log(typeof this.sto, typeof this.sfrom)
        this.stoDisable = false;
        break;
    }
    this.enableSave(activity)
  }

  enableSave(activity = 'g') {
    switch(activity) {
      case 'g':
        this.gSave = true;
        if (this.gto != '' && this.gfrom != '')
          this.gSave = false;
        console.log(typeof this.gto, typeof this.gfrom)
        console.log( this.gto,  this.gfrom)
        console.log( this.gto != '',  this.gfrom != '')
        break;
      case 'm':
        this.mSave = true;
        if (this.mto != '' && this.mfrom != '')
          this.mSave = false;
        console.log(typeof this.mto, typeof this.mfrom, )
        break;
      case 's':
        this.sSave = true;
        if (this.sto != '' && this.sfrom != '')
          this.sSave = false;
        console.log(typeof this.sto, typeof this.sfrom)
        break;
    }
  }

}
