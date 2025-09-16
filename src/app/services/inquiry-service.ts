import { Injectable } from '@angular/core';
import {GqlService} from './gql-service';
import {SEND_INQUIRY_GQL} from '../objects/gql';
import {CONTACT_US_FORM} from '../objects/forms';
import {CONTACT_US_BUTTONS} from '../objects/buttons';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {
  inquiryForm: any[] = [];
  constructor(
    private gqlService: GqlService,
  ) {

  }
  setInquiryForm(form: any) {
    this.inquiryForm = form.map((formElement: any) => formElement);
  }
  getInquiryForm() {
    return this.inquiryForm;
  }
  generateGqlInput() {
    return {
      firstName: this.inquiryForm[0].value,
      lastName: this.inquiryForm[1].value,
      email: this.inquiryForm[2].value,
      subject: this.inquiryForm[3].value,
      message: this.inquiryForm[4].value
    }
  }
  toggleDisableInquiryForm(toggle: boolean) {
    this.getInquiryForm().forEach((element: any) => {
      element.disabled = toggle;
    })
  }
  sentInquiry() {
    let gqlInput = this.generateGqlInput();
    CONTACT_US_BUTTONS[0].loading = true;
    this.toggleDisableInquiryForm(true);
    return this.gqlService.gqlMutation(
      SEND_INQUIRY_GQL,
      false,
      { gqlInput },
      'Thank you for reaching out to us. Your inquiry has been received and our team will get back to you shortly.',
      () => {
        this.resetInquiryForm();
        CONTACT_US_BUTTONS[0].loading = false;
        this.toggleDisableInquiryForm(false);
      },
      () => {
        CONTACT_US_BUTTONS[0].loading = false;
      },
    )
  }
  resetInquiryForm() {
    this.inquiryForm.forEach((formElement: any) => {
      formElement.value = '';
    })
  }
}
