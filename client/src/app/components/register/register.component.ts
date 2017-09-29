// Angular imports
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
// Project imports
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const customer = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    if (!this.validateService.validateCustomer(customer)) {
      this.flashMessagesService.show('Please fill acll addreses', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    if (!this.validateService.validateEmail(customer.email)) {
      this.flashMessagesService.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    this.authService.registerCustomer(customer).subscribe(data => {
      if (data.success) {
        this.flashMessagesService.show('You are registered', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/login']);
      } else {
        this.flashMessagesService.show('Registration failed', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/register']);
      }
    });


  }

}
