import {Component, Input} from '@angular/core';
import {PRODUCT_SOLUTIONS} from '../../objects/objects';

@Component({
  selector: 'app-mini-table',
  imports: [],
  templateUrl: './mini-table.html',
  styleUrl: './mini-table.scss'
})
export class MiniTable {
  @Input() miniTableElement: any = {};
  constructor() {
  }

  getMiniTableElement() {
    return this.miniTableElement;
  }
  getMiniTableHeader() {
    return this.getMiniTableElement().header;
  }
  getMiniTableElements() {
    return this.getMiniTableElement().elements;
  }
}
