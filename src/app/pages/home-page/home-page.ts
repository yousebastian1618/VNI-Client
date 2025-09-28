import {Component} from '@angular/core';
import {AboutPage} from '../about-page/about-page';
import {ProductSolutionPage} from '../product-solution-page/product-solution-page';
import {RegulatoryCompliancePage} from '../regulatory-compliance-page/regulatory-compliance-page';
import {ContactUs} from '../contact-us/contact-us';
import {Faq} from '../faq/faq';
import {Footer} from '../../components/footer/footer';
import {Introduction} from '../introduction/introduction';
import {BlogPage} from '../blog-page/blog-page';
import {HOME_PAGE_IMAGES} from '../../objects/objects';
import {SampleProducts} from '../sample-products/sample-products';
import {NavigationBar} from '../../components/navigation-bar/navigation-bar';
import {BlogService} from '../../services/blog-service';
import {ProductServices} from '../../services/product-services';
import {AsyncPipe} from '@angular/common';
import {MaintenancePage} from '../maintenance-page/maintenance-page';
import {MaintenanceService} from '../../services/maintenance-service';

@Component({
  selector: 'app-home-page',
  imports: [
    AboutPage,
    ProductSolutionPage,
    RegulatoryCompliancePage,
    ContactUs,
    Faq,
    Footer,
    Introduction,
    BlogPage,
    SampleProducts,
    NavigationBar,
    AsyncPipe,
    MaintenancePage
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {
  constructor(
    private blogService: BlogService,
    public productService: ProductServices,
    private maintenanceService: MaintenanceService,
  ) {

  }
  isUnderMaintenance() {
    return this.maintenanceService.getIsUnderMaintenance();
  }
  getIntroductionImages() {
    return HOME_PAGE_IMAGES;
  }
  getIntroductionIntervalTime() {
    return 5000;
  }
  getSampleProducts() {
    return this.productService.getProductImages();
  }
  getBlogs() {
    return this.blogService.getBlogsObservable();
  }
}
