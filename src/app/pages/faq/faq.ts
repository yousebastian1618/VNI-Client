import { Component } from '@angular/core';
import {Icon} from '../../components/icon/icon';
import {FAQ_ELEMENTS} from '../../objects/objects';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-faq',
  imports: [
    Icon,
    NgOptimizedImage
  ],
  templateUrl: './faq.html',
  styleUrl: './faq.scss'
})
export class Faq {
  selectedIndex: number | null = null;
  constructor() {
  }
  getFaqs() {
    return FAQ_ELEMENTS;
  }
  toggleShowAnswer(index: number) {
    this.selectedIndex = this.selectedIndex === index ? null : index;
  }
  toggleArrowIcon(index: number) {
    return this.selectedIndex === index ? 'arrow_down' : 'arrow_right';
  }
  getToggleAnswerStyle(index: number) {
    return this.selectedIndex === index ? '' : 'display: none;';
  }
}
