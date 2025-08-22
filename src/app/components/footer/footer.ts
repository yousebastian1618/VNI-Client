import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {CONTACT_INFO, FOOTER_ELEMENTS, FOOTER_SOCIAL_MEDIAS} from '../../objects/objects';
import {Icon} from '../icon/icon';

@Component({
  selector: 'app-footer',
  imports: [
    NgOptimizedImage,
    Icon
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  constructor() {
  }
  getContactInfo() {
    return CONTACT_INFO;
  }
  getSocialMedias() {
    return FOOTER_SOCIAL_MEDIAS;
  }
  getFooterElements() {
    return FOOTER_ELEMENTS;
  }
}
