import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-buttons',
  imports: [],
  templateUrl: './buttons.html',
  styleUrl: './buttons.scss'
})
export class Buttons {
  @Input() buttons: any[] = [];

  constructor() {
  }

  getButtons() {
    return this.buttons;
  }
  handleClick(button: any) {
    console.log(button);
  }
}
