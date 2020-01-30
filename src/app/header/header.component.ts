import { Component, OnInit } from '@angular/core';
import { User } from '../shared/login/User.model';
import { Router } from '@angular/router';
import { LoginService } from '../shared/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  User: string;

  constructor(private router: Router, private authenticationService: LoginService) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      }

  ngOnInit() {
    // this.User = this.authenticationService.list.filter(c => c.username).toString();
     // console.log(this.User);
     if (this.authenticationService.currentUser) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
     }
    
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
