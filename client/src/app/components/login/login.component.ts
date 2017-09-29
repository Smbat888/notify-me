// Angular imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
// Project imports
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const customer = {
      username: this.username,
      password: this.password
    };

    this.authService.loginCustomer(customer).subscribe(data => {
      if (data.success) {
        this.authService.storeCustomerData(data.token, data.user);
        this.flashMessage.show('You are now logged in', { cssClass: 'alert-success', timeout: 5000 });
        this.router.navigate(['home']);
      } else {
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 5000 });
        this.router.navigate(['login']);
      }
    });
  }
}
