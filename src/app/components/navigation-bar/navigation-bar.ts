import {Component, HostListener, signal} from '@angular/core';
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
  compact = signal(false);
  private threshold = 500; // px from top before shrinking
  @HostListener('window:scroll')
  onScroll() {
    this.compact.set(window.scrollY > this.threshold);
  }
  constructor(
    private userService: UserService,
    private crudService: CrudService,
  ) {}
  getNavigationBarElements() {
    let navigationBarElements = [...NAVIGATION_BAR_ELEMENTS];
    if (!this.userService.isAdmin()) {
      return navigationBarElements.filter((element: any) => element.name !== 'logout');
    }
    return navigationBarElements;
  }
  async goInContainer(sectionId: string | undefined) {
    await this.crudService.goInContainer(sectionId);
  }
}
