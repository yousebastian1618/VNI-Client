import { Injectable } from '@angular/core';
import {GqlService} from './gql-service';
import {GET_USER_BY_TOKEN, LOGIN__GQL} from '../objects/gql';
import {CookieService} from 'ngx-cookie-service';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loginForm: any[] = [];
  forgotPasswordForm: any[] = [];
  userObject = new BehaviorSubject<any>(null);
  user$ = this.userObject.asObservable();
  accessToken: string = '';
  refreshToken: string = '';
  constructor(
    private gqlService: GqlService,
    private cookieService: CookieService,
    private router: Router,
  ) {
  }
  login() {
    const gqlInput = this.loginForm.reduce((acc: any, elem: any) => {
      acc[elem.gqlKey] = elem.value;
      return acc;
    }, {});
    this.gqlService.gqlMutation(
      LOGIN__GQL,
      false,
      { email: gqlInput.email, password: gqlInput.password },
      '',
      async (response) => {
        this.userObject.next(response.login.user);
        this.accessToken = response.login.accessToken;
        this.refreshToken = response.login.refreshToken;
        let cookieExpirationTime = new Date();
        cookieExpirationTime.setHours(cookieExpirationTime.getHours() + 12)
        this.cookieService.set('accessToken', this.accessToken, cookieExpirationTime, '/', environment.cross_domain, true, 'None');
        this.cookieService.set('refreshToken', this.refreshToken, cookieExpirationTime, '/', environment.cross_domain, true, 'None');
        await this.router.navigate(['/'])
      },
      () => {

      },
      true
    )
  }
  logout() {
    this.cookieService.deleteAll('/', environment.cross_domain, false);
    this.userObject.next(null);
  }
  retrieveUserByToken() {
    this.gqlService.gqlQuery(
      GET_USER_BY_TOKEN,
      true,
      '',
      async (response: any) => {
        this.userObject.next(response.getUserByToken)
        if (this.userObject.getValue()) {
          await this.router.navigate(['/']);
        }
      },
      () => {},
      true
    )
  }
  getUser() {
    return this.user$;
  }
  isAdmin() {
    return this.userObject.getValue() !== null;
  }
  getLoginForm() {
    return this.loginForm;
  }
  setLoginForm(form: any) {
    this.loginForm = form.map((formElement: any) => formElement);
  }
  resetLoginForm() {
    this.loginForm.forEach((formElement: any) => {
      formElement.value = '';
    })
  }
  getForgotPasswordForm() {
    return this.forgotPasswordForm;
  }
  setForgotPasswordForm(form: any) {
    this.forgotPasswordForm = form.map((formElement: any) => formElement);
  }
  resetForgotPasswordForm() {
    this.forgotPasswordForm.forEach((formElement: any) => {
      formElement.value = '';
    })
  }
}
