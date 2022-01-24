import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UtilityServiceService } from 'src/app/services/utility-service.service';
import { DrilingComponent, DrillerModel } from '../../driling/driling.component';

@Component({
  selector: 'app-replacement-status',
  templateUrl: './replacement-status.component.html',
  styleUrls: ['./replacement-status.component.css']
})
export class ReplacementStatusComponent implements OnInit {

  popupTitle
  driller: DrillerModel
  reaminingHours
  replaceQuantity

  constructor(
    public dialogRef: MatDialogRef<DrilingComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _us: UtilityServiceService
  ) {
    if (data) {
      this.popupTitle = data.partName + ' Status';
      this.driller = data;
      this.replaceQuantity = data.quantityToBeReplaced
      this.reaminingHours = this.driller.maxHours - this.driller.runHours;
      // this.replacementInfo.data = this.driller;
    }
    console.log(this.driller)
  }

  // replacementInfo = new MatTableDataSource<DrillerModel>(this.driller);
  // displayedColumns = [
  //   'runHours',
  //   'maxHours',
  //   'reaminingHours'
  // ];

  ngOnInit(): void {
    // this.replacementInfo.data = this.driller;
  }

  removeWhiteSpaces(control) {
    let value = control.value;
    value = value.trim();
    control.setValue(value);
  }

  onSubmit() {
    console.log(this.driller);
    this.driller['replaceQuantity'] = this.driller.quantityToBeReplaced;
    this._us.replaceDevicePart(this.driller).subscribe((data:any) => {
      if (data.status) {
        this.closePopup(data.message)
      }
      else {
      }
    }, err => {
    })
  }

  closePopup(msg = '', status = true) {
    this.dialogRef.close({
      status: status,
      message: msg
    });
  }

  getAssetImage() {
    return "../../../../../../assets/images/status-"+this.driller.hoursStatus.toLowerCase()+".gif";
  }

  getButtonAttributes() {
    let btnColor = 'primary';
    switch (this.driller.hoursStatus.toLowerCase()) {
      case 'RED':
        btnColor = 'danger'
        break;
      case 'ORANGE':
        btnColor = 'warning'
        break;
      case 'GREEN':
        btnColor = 'success'
        break;
    }
    return btnColor;
  }
}
