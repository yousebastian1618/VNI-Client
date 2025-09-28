import { Component } from '@angular/core';
import {MAINTENANCE_SUBTITLE, MAINTENANCE_TITLE} from '../../objects/objects';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-maintenance-page',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './maintenance-page.html',
  styleUrl: './maintenance-page.scss'
})
export class MaintenancePage {
  constructor() {

  }
  getLogo() {
    return "assets/logo.png";
  }
  getMaintenanceTitle() {
    return MAINTENANCE_TITLE;
  }
  getMaintenanceSubtitle() {
    return MAINTENANCE_SUBTITLE;
  }
}
