import { Component } from '@angular/core';
import {MiniTable} from '../../components/mini-table/mini-table';
import {PRODUCT_SOLUTIONS} from '../../objects/objects';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-product-solution-page',
  imports: [
    MiniTable,
    NgOptimizedImage
  ],
  templateUrl: './product-solution-page.html',
  styleUrl: './product-solution-page.scss'
})
export class ProductSolutionPage {
  constructor() {
  }
  getProductSolutions() {
    return PRODUCT_SOLUTIONS;
  }
  getWidth() {
    return `width: ${100 / this.getProductSolutions().length}%;`;
  }
}
