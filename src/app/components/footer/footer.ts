import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {CONTACT_INFO, FOOTER_ELEMENTS, FOOTER_SOCIAL_MEDIAS} from '../../objects/objects';
import {Icon} from '../icon/icon';
import {CrudService} from '../../services/crud-service';

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
  constructor(
    private crudService: CrudService
  ) {
  }
  getContactInfo() {
    return CONTACT_INFO;
  }
  getFooterElements() {
    return FOOTER_ELEMENTS;
  }
  async goInContainer(sectionId: string | undefined) {
    await this.crudService.goInContainer(sectionId);
  }
}
