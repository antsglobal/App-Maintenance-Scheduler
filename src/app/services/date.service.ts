import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(
    public datepipe: DatePipe
  ) { }

  /**
   * 
   * @param start Start Date
   * @param end End Date
   * @returns array of dates between start and end dates
   */
  getBetweenDates(start, end) {
    for(var arr = [],dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate()+1)){
        arr.push(this.formatDate(dt));
    }
    return arr;
  };

  formatDate(date, time = false) {
    let toFormate = 'yyyy-MM-dd';
    if (time)
      toFormate = toFormate + ' HH:MM';
    return this.datepipe.transform(new Date(date), toFormate)
  }
}
