// Angular imports
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
// RXjs imports
import 'rxjs/add/operator/map';
// Project imports
import { environment } from '../../environments/environment';


@Injectable()
export class AuthService {
  authToken: string;
  customer: any;
  // domain = ""; // Production
  domain: string;

  constructor(private http: Http) {
    this.domain = environment.domain;
  }

  registerCustomer(customer) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.domain + 'register', customer, { headers: headers })
      .map(res => res.json());
  }

  loginCustomer(customer) {
    console.log('Auth service: authenticateUser()');
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.domain + 'auth', customer, { headers: headers })
      .map(res => res.json());
  }

  logoutCustomer() {
    this.authToken = null;
    this.customer = null;
    localStorage.clear();
  }

  storeCustomerData(token, customer) {
    localStorage.setItem('token', token);
    localStorage.setItem('customer', JSON.stringify(customer));
    this.authToken = token;
    this.customer = customer;
  }

  // Check if Customer is logged in
  isCustomerAuthorized(): boolean {
    return tokenNotExpired();
  }

}
