import {Component, Input} from '@angular/core';
import {AboutPage} from '../about-page/about-page';
import {ProductSolutionPage} from '../product-solution-page/product-solution-page';
import {RegulatoryCompliancePage} from '../regulatory-compliance-page/regulatory-compliance-page';
import {ContactUs} from '../contact-us/contact-us';
import {Faq} from '../faq/faq';
import {Footer} from '../../components/footer/footer';
import {Introduction} from '../introduction/introduction';

@Component({
  selector: 'app-home-page',
  imports: [
    AboutPage,
    ProductSolutionPage,
    RegulatoryCompliancePage,
    ContactUs,
    Faq,
    Footer,
    Introduction
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {
  constructor() {
  }
  getIntroductionImages() {
    return [
      'assets/home-page/home-page-1.png',
      'assets/home-page/home-page-2.png',
      'assets/home-page/home-page-3.png',
      'assets/home-page/home-page-4.png',
    ];
  }
  getIntroductionIntervalTime() {
    return 5000;
  }
}
