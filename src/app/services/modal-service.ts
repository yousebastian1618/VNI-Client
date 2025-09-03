import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  isModalOn: boolean = false;
  type: string = '';
  title: string = '';
  subtitle: string = '';
  main: any = null;
  buttons: any[] = [];
  constructor() {

  }
  modalOn(payload: any) {
    this.type = payload.type;
    this.title = payload.title;
    this.subtitle = payload.subtitle;
    this.main = payload.main;
    this.buttons = payload.buttons;
    this.isModalOn = true;
  }
  modalOff() {
    this.type = '';
    this.title = '';
    this.subtitle = '';
    this.main = null;
    this.buttons = [];
    this.isModalOn = false;
  }
  showStatus() {

  }
}
