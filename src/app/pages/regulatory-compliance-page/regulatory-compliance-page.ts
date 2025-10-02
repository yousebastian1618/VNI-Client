import { Component } from '@angular/core';
import {MiniTable} from "../../components/mini-table/mini-table";
import {REGULATORY_COMPLIANCE, REGULATORY_COMPLIANCE_MESSAGE} from '../../objects/objects';
import {NgOptimizedImage} from '@angular/common';
import {InViewportDirective} from '../../in-viewport.directive';

@Component({
  selector: 'app-regulatory-compliance-page',
  imports: [
    MiniTable,
    NgOptimizedImage,
    InViewportDirective
  ],
  templateUrl: './regulatory-compliance-page.html',
  styleUrl: './regulatory-compliance-page.scss'
})
export class RegulatoryCompliancePage {
  constructor() {
  }

  getProductSolutions() {
    return REGULATORY_COMPLIANCE;
  }
  getWidth() {
    return `width: ${100 / this.getProductSolutions().length}%;`;
  }
  getRegulatoryComplianceMessage() {
    return REGULATORY_COMPLIANCE_MESSAGE;
  }
}
