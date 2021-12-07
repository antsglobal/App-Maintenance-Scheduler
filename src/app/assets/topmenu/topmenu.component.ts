import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { menumodel } from 'src/app/models/menumodel';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.css']
})
export class TopmenuComponent implements OnInit {
  public menuitems: menumodel[];
 

  constructor(private menuService: MenuService) { }
  ngOnInit(): void {
    
  }

  getMenuItems(): void {
    this.menuService.getMenuItems().subscribe({
      next: (menulist) => {
        this.menuitems = menulist;
      }
    });
  }
}
