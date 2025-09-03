import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  errorMessage: string = '';
  constructor() {

  }
  checkError(form: any) {
    for (let formElement of form) {
      for (let key of Object.keys(formElement.errors)) {
        if (key === 'NOT_EMPTY') {
          if (this.checkNotEmpty(formElement.value)) {
            this.errorMessage = formElement.errors[key].message;
            return true;
          }
        } else if (key === 'TYPE') {
          if (this.checkType(formElement.value, formElement.errors[key].params)) {
            this.errorMessage = formElement.errors[key].message;
            return true;
          }
        } else if (key === 'MIN_LENGTH') {
          if (this.checkMinLength(formElement.value)) {
            this.errorMessage = formElement.errors[key].message;
            return true;
          }
        }
      }
    }
    return false;
  }
  checkNotEmpty(value: any) {
    return value === '' || value === null || value === undefined;
  }
  checkType(value: any, type: string) {
    if (type === 'email') {
      return !this.validateEmail(value);
    }
    return false;
  }
  checkMinLength(value: any) {
    return false;
  }
  validateEmail(value: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  }
}
