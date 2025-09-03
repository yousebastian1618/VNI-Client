import {Component, OnInit} from '@angular/core';
import {CONTACT_US_MESSAGE} from '../../objects/objects';
import {NgOptimizedImage} from '@angular/common';
import {Form} from '../../components/form/form';
import {CONTACT_US_FORM} from '../../objects/forms';
import {Buttons} from '../../components/buttons/buttons';
import {CONTACT_US_BUTTONS} from '../../objects/buttons';
import {InquiryService} from '../../services/inquiry-service';

@Component({
  selector: 'app-contact-us',
  imports: [
    NgOptimizedImage,
    Form,
    Buttons
  ],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.scss'
})
export class ContactUs implements OnInit {
  constructor(
    private inquiryService: InquiryService,
  ) {
  }
  ngOnInit() {
    this.inquiryService.setInquiryForm(CONTACT_US_FORM);
  }
  getMessage() {
    return CONTACT_US_MESSAGE;
  }
  getContactUsForm() {
    return this.inquiryService.getInquiryForm();
  }
  getContactUsButtons() {
    return CONTACT_US_BUTTONS;
  }
}
