import { Component, OnInit } from '@angular/core';
import { usermodel } from 'src/app/models/usermodel';
import { PeriodService } from 'src/app/services/period.service';
import { menumodel } from '../../models/menumodel';
import { MenuService } from '../../services/menu.service';
import { GlobalConstants } from '../../variables/globalvariables';


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
  ngOnInit(): void {
    //this.getMenuItems();
    this.GetPeriods();
    this.GetEmployees(sessionStorage.getItem("loggedInemployeeId"));
    this.selectedEmployee = sessionStorage.getItem("employeeId");
    this.selectedPeriod = sessionStorage.getItem("periodId");
    console.log(sessionStorage.getItem("loggedInRole"));
    console.log(this.hrmanagerdisabled);
    if(sessionStorage.getItem("loggedInRole") == "HR Manager")
    {
      this.hrmanagerdisabled=true;
    }
    

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

  onEmployeeChange() {
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

  GetEmployees(employeeId: string): void {
    const newperiod: usermodel = { employeeId } as usermodel;
    this.periodService.getEmployees(newperiod).subscribe({
      next: (periods) => {
        this.getEmployee = periods['data'];
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}
