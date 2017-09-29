// Angular imports
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// RXjs imports
import { Observable } from 'rxjs/Observable';
// Project imports
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  public redirectUrl: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
      if (this.authService.isCustomerAuthorized()) {
        console.log('Customer is authorized');
        return true;
      } else {
        this.redirectUrl = state.url; // Grab previous url
        this.router.navigate(['/login']); // Return error and route to login page
        return false; // Return false: user not authorized to view page
      }
  }
}
