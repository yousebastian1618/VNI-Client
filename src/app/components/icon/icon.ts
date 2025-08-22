import {Component, Input} from '@angular/core';
import {ICON_MAP} from '../../objects/objects';

@Component({
  selector: 'app-icon',
  imports: [],
  templateUrl: './icon.html',
  styleUrl: './icon.scss'
})
export class Icon {
  @Input() icon: string = '';
  @Input() tooltip: string = '';
  showingTooltip: boolean = false;
  constructor() {
  }
  getIconMap() {
    return ICON_MAP;
  }
  getIcon() {
    if (this.getIconMap()[this.icon]) {
      return this.getIconMap()[this.icon].icon;
    }
    return '';
  }
  onMouseEnter() {
    if (this.tooltip === '') return;
    this.showingTooltip = true;
  }
  onMouseLeave() {
    if (this.tooltip === '') return;
    this.showingTooltip = false;
  }
  // @Input() icon: string = '';
  // @Input() tooltip: string = '';
  // timeout: any = null;
  // opacity: number = 0;
  // constructor() {
  // }
  //
  // onMouseEnter() {
  //   if (this.tooltip) {
  //     this.timeout = setTimeout(() => {
  //       this.opacity = 1;
  //     }, 1000);
  //   }
  // }
  // onMouseLeave() {
  //   if (this.tooltip) {
  //     clearTimeout(this.timeout);
  //     this.opacity = 0;
  //   }
  // }
}
