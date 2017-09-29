// Angular imports
import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateCustomer(customer): boolean {
    if (customer.name === undefined || customer.email === undefined || customer.username === undefined || customer.password === undefined) {
      return false;
    }
    return true;
  }

  validateEmail(email) {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }


}
