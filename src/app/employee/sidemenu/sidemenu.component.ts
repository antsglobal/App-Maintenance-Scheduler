import { Component, OnInit } from '@angular/core';
import { usermodel } from 'src/app/models/usermodel';
import { PeriodService } from 'src/app/services/period.service';
import { menumodel } from '../../models/menumodel';
import { MenuService } from '../../services/menu.service';
import { GlobalConstants } from '../../variables/globalvariables';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {startWith, map} from 'rxjs/operators';


@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  public menuitems: menumodel[];
  getPeriods: any;
  getEmployee: any;
  errorMessage: any;
  constructor(private menuService: MenuService, private periodService: PeriodService) { }
  menucollapsetext: string = '<';
  iconmenu: boolean = false;
  selectedEmployee: string;
  selectedPeriod: string;
  hrmanagerdisabled: boolean=false;
  searchEmployee = new FormControl();
  filteredEmployees: Observable<usermodel[]>;
  employeeName: string;
  ngOnInit(): void {
    //this.getMenuItems();
    this.GetALLPeriods();
    this.GetEmployees(sessionStorage.getItem("loggedInemployeeId"));
    this.filterEmployee();
    this.employeeName = sessionStorage.getItem("employeeName");
    this.selectedEmployee = sessionStorage.getItem("employeeId");
    this.selectedPeriod = sessionStorage.getItem("periodId");
    console.log(sessionStorage.getItem("loggedInRole"));
    console.log(this.hrmanagerdisabled);
    if(sessionStorage.getItem("loggedInRole") == "HR Manager")
    {
      this.hrmanagerdisabled=true;
    }
    if (this.employeeName !== null && this.selectedEmployee !== null) {
            this.searchEmployee.setValue({employeeId: this.selectedEmployee, employeeName: this.employeeName})
          }
  }

  filterEmployee() {
    if (this.getEmployee && this.getEmployee.length == 1) {
      this.searchEmployee.setValue(this.getEmployee[0])
    }
    this.filteredEmployees = this.searchEmployee.valueChanges.pipe(startWith(''),map((value) => {
      return this._filter(value)
    }));
  }

    displayProperty(value) {
      if (value) {
        return value.employeeName;
      }
    }
    
    private _filter(value: string | usermodel): usermodel[] {
      if (value) {
        const filterValue = typeof value === 'string' ? value.toLowerCase() :  this._normalizeValue(value.employeeName);
        return this.getEmployee.filter(e => this._normalizeValue(e.employeeName).includes(filterValue));
      }
      else {
        return this.getEmployee;
      }
    }   
    
    private _normalizeValue(value: string): string {
      return value.toLowerCase();//.replace(/\s/g, '');
    }

  getMenuItems(): void {
    this.menuService.getMenuItems().subscribe({
      next: (menulist) => {
        this.menuitems = menulist;
      }
    });
  }
  shortmenu(): void {
    if (this.menucollapsetext == '>') {
      this.menucollapsetext = '<';
    }
    else {
      this.menucollapsetext = '>';
    }
    this.iconmenu = !this.iconmenu;
  }

  onPeriodChange() {
    sessionStorage.setItem("periodId", this.selectedPeriod);
    window.location.reload();
  }

  onEmployeeChange(event: any) {
    this.employeeName = event.option.value.employeeName;    
    this.selectedEmployee = event.option.value.employeeId;    
    sessionStorage.setItem("employeeName", this.employeeName);
    sessionStorage.setItem("employeeId", this.selectedEmployee);
    window.location.reload();
  }

  GetPeriods(): void {
    const newperiod: usermodel = {} as usermodel;
    this.periodService.getPeriods(newperiod).subscribe({
      next: (periods) => {
        this.getPeriods = periods['data'];
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  GetALLPeriods(): void {
    const newperiod: usermodel = {} as usermodel;
    this.periodService.getAllPeriods(newperiod).subscribe({
      next: (periods) => {
        this.getPeriods = periods['data'];
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  GetEmployees(employeeId: string): void {
    const newperiod: usermodel = { employeeId } as usermodel;
    this.periodService.getEmployees(newperiod).subscribe({
      next: (periods) => {
        this.getEmployee = periods['data'];
        this.filterEmployee();
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}
