import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {
  iconmenu: boolean = false;
  adminPrivileges: boolean = false;

  constructor() { }
  ngOnInit(): void {
    if (sessionStorage.getItem("loggedInemployeeName") == "Admin") {
      this.adminPrivileges = true;
    }
  }
  shortmenu(): void {
    this.iconmenu = !this.iconmenu;
  }
}
