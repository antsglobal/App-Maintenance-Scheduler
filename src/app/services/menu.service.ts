import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { menumodel } from '../models/menumodel';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuItemsUrl = 'appdata/menu.json';
  private accesibleMenuItemsUrl = 'appdata/side-menu-access.json';

  constructor(private http: HttpClient) { }

  getMenuItems(): Observable<menumodel[]> {
    return this.http.get<menumodel[]>(this.menuItemsUrl);
  }

  getAccessibleMenuItems(): Observable<menumodel[]> {
    return this.http.get<menumodel[]>(this.accesibleMenuItemsUrl);
  } 
}