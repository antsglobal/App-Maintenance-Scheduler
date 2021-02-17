import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username = sessionStorage.getItem('name');
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  logout() {
    sessionStorage.clear();
    this.router.navigate(["/guest/login"]);
  }

  profile(){
    this.router.navigate(["/employee/profile"]);
  }
}
