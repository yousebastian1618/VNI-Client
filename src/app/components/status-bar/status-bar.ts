import { Component } from '@angular/core';
import {StatusService} from '../../services/status-service';
import {Icon} from '../icon/icon';

@Component({
  selector: 'app-status-bar',
  imports: [
    Icon
  ],
  templateUrl: './status-bar.html',
  styleUrl: './status-bar.scss'
})
export class StatusBar {
  constructor(
    private statusService: StatusService,
  ) {
  }
  getStatusType() {
    return this.statusService.type;
  }
  getStatusMessage() {
    return this.statusService.message;
  }
}
