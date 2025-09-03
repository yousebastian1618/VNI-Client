import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {NAVIGATION_BAR_ELEMENTS} from '../../objects/objects';
import {UserService} from '../../services/user-service';
import {CrudService} from '../../services/crud-service';

@Component({
  selector: 'app-navigation-bar',
  imports: [
    NgOptimizedImage,
  ],
  templateUrl: './navigation-bar.html',
  styleUrl: './navigation-bar.scss'
})
export class NavigationBar {
  constructor(
    private userService: UserService,
    private crudService: CrudService
  ) {}
  getNavigationBarElements() {
    let navigationBarElements = [...NAVIGATION_BAR_ELEMENTS];
    if (!this.userService.isAdmin()) {
      return navigationBarElements.filter((element: any) => element.name !== 'logout');
    }
    return navigationBarElements;
  }
  goInContainer(sectionId: string | undefined) {
    if (!sectionId) return;
    if (sectionId === 'logout') {
      this.crudService.handleCrud(sectionId, null);
      return;
    }
    const container = document.querySelector('.home-container') as HTMLElement | null;
    const target = document.querySelector(`.${CSS.escape(sectionId)}`) as HTMLElement | null; // or use #id
    if (!container || !target) return;
    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const headerOffset = 0; // adjust as needed
    const top = targetRect.top - containerRect.top + container.scrollTop - headerOffset;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }
}
