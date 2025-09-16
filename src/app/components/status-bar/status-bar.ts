import { Component } from '@angular/core';
import {StatusService} from '../../services/status-service';
import {Icon} from '../icon/icon';
import {CrudService} from '../../services/crud-service';

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
    private crudService: CrudService
  ) {
  }
  getStatusType() {
    return this.statusService.type;
  }
  getStatusMessage() {
    return this.statusService.message;
  }
  getShowUndo() {
    return this.statusService.showUndo;
  }
  async undo() {
    await this.crudService.handleCrud('undo', null);
  }
}
