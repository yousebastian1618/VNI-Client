import {Component, OnInit} from '@angular/core';
import {Form} from '../../components/form/form';
import {FORGOT_PASSWORD_FORM, LOGIN_FORM} from '../../objects/forms';
import {NgOptimizedImage} from '@angular/common';
import {Buttons} from '../../components/buttons/buttons';
import {ADMIN_FORGOT_PASSWORD_BUTTONS, ADMIN_LOGIN_BUTTONS} from '../../objects/buttons';
import {Icon} from '../../components/icon/icon';
import {Router} from '@angular/router';
import {UserService} from '../../services/user-service';

@Component({
  selector: 'app-login-page',
  imports: [
    Form,
    NgOptimizedImage,
    Buttons,
    Icon
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage implements OnInit {
  forgotPassword: boolean = false;
  constructor(
    private router: Router,
    private userService: UserService
  ) {

  }
  ngOnInit() {
    this.userService.setLoginForm(LOGIN_FORM);
    this.userService.setForgotPasswordForm(FORGOT_PASSWORD_FORM);
  }
  getLoginForm() {
    return this.forgotPassword ? this.userService.getForgotPasswordForm() : this.userService.getLoginForm();
  }
  getAdminLoginButtons() {
    return this.forgotPassword ? ADMIN_FORGOT_PASSWORD_BUTTONS : ADMIN_LOGIN_BUTTONS;
  }
  toggleForgotPassword(toggle?: boolean) {
    this.forgotPassword = toggle !== undefined ? toggle : !this.forgotPassword;
  }
  async goToHomePage() {
    return await this.router.navigate(['/']);
  }
}
