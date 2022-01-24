import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
//import { GlobalConstants } from '../../variables/globalvariables';
//import { FormControl } from '@angular/forms';
//import { Observable, Subscription } from 'rxjs';
//import { startWith, map } from 'rxjs/operators';
import { MenuService } from 'src/app/services/menu.service';


@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  errorMessage: any;
  menucollapsetext: string = '<';
  iconMenu: boolean = true;
  adminPrivileges: boolean = false;

  panelOpenState = false;

  menuServiceSub: Subscription
  menuItems
  
  @Input() childMenuStyle: string;

  constructor(
    private menuService: MenuService
  ) { 
    console.log('childMenuStyle: ', this.childMenuStyle)
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("loggedInemployeeName") == "Admin") {
      this.adminPrivileges = true;
    }

    this.getAvailableMenuItems();
  }

  getAvailableMenuItems() {
    this.menuServiceSub = this.menuService.getAccessibleMenuItems().subscribe(data => {
      this.menuItems = data;
      console.log(data);
    })
  }

  shortmenu(): void {
    if (this.menucollapsetext == '>') {
      this.menucollapsetext = '<';
    }
    else {
      this.menucollapsetext = '>';
    }
    this.iconMenu = !this.iconMenu;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.shortmenu()
    console.log('childMenuStyle: ', this.childMenuStyle)
    // changes.prop contains the old and the new value...
  }
}
