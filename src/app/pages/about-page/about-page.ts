import { Component } from '@angular/core';
import {HOW_CAN_WE_HELP_YOU, OUR_MISSION, WHO_WE_ARE} from '../../objects/objects';
import {NgOptimizedImage} from '@angular/common';
import {InViewportDirective} from '../../in-viewport.directive';

@Component({
  selector: 'app-about-page',
  imports: [
    NgOptimizedImage,
    InViewportDirective
  ],
  templateUrl: './about-page.html',
  styleUrl: './about-page.scss'
})
export class AboutPage {
  constructor(
  ){}

  getWhoWeAre() {
    return WHO_WE_ARE;
  }
  getOutMission() {
    return OUR_MISSION;
  }
  getHowCanWeHelpYou() {
    return HOW_CAN_WE_HELP_YOU;
  }
}
