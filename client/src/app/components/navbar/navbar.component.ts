// Angular imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
// Project imports
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  // Logout customer
  onLogoutClick() {
    this.authService.logoutCustomer();
    this.flashMessagesService.show('You are logged out', { cssClass: 'alert-info' });
    this.router.navigate(['login']);
  }


}
