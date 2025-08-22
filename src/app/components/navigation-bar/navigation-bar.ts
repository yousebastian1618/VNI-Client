import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {NAVIGATION_BAR_ELEMENTS} from '../../objects/objects';

@Component({
  selector: 'app-navigation-bar',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './navigation-bar.html',
  styleUrl: './navigation-bar.scss'
})
export class NavigationBar {
  constructor(){}

  getNavigationBarElements() {
    return NAVIGATION_BAR_ELEMENTS;
  }
}
