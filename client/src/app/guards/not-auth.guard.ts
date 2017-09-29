// Angular imports
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// Project imports
import { AuthService } from '../services/auth.service';

@Injectable()
export class NotAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  // Function to determine whether customer is authorized to view route
  canActivate() {
    if (this.authService.isCustomerAuthorized()) {
      console.log('Customer is Authorized');
      //this.router.navigate(['/home']); // Return error, route to home
      return false; // Return false: user not allowed to view route
    } else {
      return true; // Return true: user is allowed to view route
    }
  }
}
