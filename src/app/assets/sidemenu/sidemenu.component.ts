import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../../variables/globalvariables';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';


@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  errorMessage: any;
  constructor() { }
  menucollapsetext: string = '<';
  iconmenu: boolean = false;
  adminPrivileges: boolean = false;

  ngOnInit(): void {
    if (sessionStorage.getItem("loggedInemployeeName") == "Admin") {
      this.adminPrivileges = true;
    }
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
}
