import { Component, OnInit } from '@angular/core';
import { menumodel } from '../../models/menumodel';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.css']
})
export class TopmenuComponent implements OnInit {
  public menuitems: menumodel[];
  constructor(private menuService: MenuService) { }
  ngOnInit(): void {
    this.getMenuItems();
  }
  getMenuItems(): void {
    this.menuService.getMenuItems().subscribe({
      next: (menulist) => {
        this.menuitems = menulist;
      }
    });
  }

}
