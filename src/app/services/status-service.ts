import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  type: string = '';
  message: string = '';
  showingStatus: boolean = false;
  statusTime: number = 5000;
  statusTimeout: any = null;
  showUndo: boolean = false;
  constructor() {
  }
  showStatus(type: string, message: string, showUndo: boolean = false) {
    this.showUndo = showUndo;
    this.type = type;
    this.message = message;
    clearTimeout(this.statusTimeout);
    this.showingStatus = true;
    this.statusTimeout = setTimeout(() => {
      this.showingStatus = false;
      clearTimeout(this.statusTimeout);
      this.resetStatus();
    }, this.statusTime);
  }
  closeStatus() {
    clearTimeout(this.statusTimeout);
    this.showingStatus = false;
    this.type = '';
    this.message = '';
  }
  resetStatus() {
    this.type = '';
    this.message = '';
  }
}
