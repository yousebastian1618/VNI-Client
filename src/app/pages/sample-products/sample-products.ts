import {Component, Input} from '@angular/core';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {Icon} from '../../components/icon/icon';
import {CrudService} from '../../services/crud-service';
import {ProductServices} from '../../services/product-services';

@Component({
  selector: 'app-sample-products',
  imports: [
    NgOptimizedImage,
    Icon,
    NgClass
  ],
  templateUrl: './sample-products.html',
  styleUrl: './sample-products.scss'
})
export class SampleProducts {
  currentPage: number = 0;
  numberOfProductsPerPage: number = 6;
  slideDirection: 'left' | 'right' | null = null;
  @Input() sampleProducts: any[] = [];
  constructor(
    private crudService: CrudService,
    private productService: ProductServices
  ) {
  }
  getSampleProducts() {
    return this.sampleProducts;
  }
  getCurrentPageProducts() {
    return this.getSampleProducts().slice(
      this.currentPage === 0 ? this.currentPage : this.currentPage * this.numberOfProductsPerPage,
      (this.currentPage + 1) * this.numberOfProductsPerPage);
  }
  async viewMore() {
    let button = 'view|images';
    await this.crudService.handleCrud(button, null);
  }
  goTo(direction: number) {
    const next = this.currentPage + direction;
    this.slideDirection = direction === 1 ? 'right' : 'left'; // ⬅️ set direction
    this.currentPage = next;
  }
  async viewImage(product: any) {
    let button = 'view|image';
    await this.crudService.handleCrud(button, product);
  }
  getImageSrc(image: any) {
    return this.productService.getImageSrc(image);
  }
}
