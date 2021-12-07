import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HrmanagerGuard implements CanActivate {
  constructor(private router: Router, private snackBar: MatSnackBar) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (sessionStorage.getItem("loggedInRole") == "HR Manager") {
      return true;
    } else {
      this.snackBar.open('you do not have access for this page', 'Close', { horizontalPosition: 'center', verticalPosition: 'top' });
    }
  }
}
