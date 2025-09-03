import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  type: string = '';
  message: string = '';
  showingStatus: boolean = false;
  statusTime: number = 3000;
  statusTimeout: any = null;
  constructor() {
  }
  showStatus(type: string, message: string) {
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
