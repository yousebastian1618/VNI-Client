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
  sentInquiry() {
    const gqlInput = this.inquiryForm.reduce((acc: any, elem: any) => {
      acc[elem.gqlKey] = elem.value;
      return acc;
    }, {});
    return this.gqlService.gqlMutation(
      SEND_INQUIRY_GQL,
      false,
      { gqlInput },
      'Thank you for reaching out to us. Your inquiry has been received and our team will get back to you shortly.',
      () => {
        this.resetInquiryForm();
        CONTACT_US_BUTTONS[0].loading = false;
      },
      () => {},
      true
    )
  }
  resetInquiryForm() {
    this.inquiryForm.forEach((formElement: any) => {
      formElement.value = '';
    })
  }
}
