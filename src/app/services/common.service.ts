import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  calcPercentage(actual = 0, total = 100, decimals = 0) {
    let percentage = (actual / total) * 100;
    if (decimals == 0) {
      return Math.round(percentage);
    }
    else if(decimals > 0) {
      return percentage.toFixed(decimals)
    }
  }
}
