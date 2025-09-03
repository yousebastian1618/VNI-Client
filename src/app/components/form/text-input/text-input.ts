import {Component, Input, SimpleChanges} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-text-input',
  imports: [
    FormsModule
  ],
  templateUrl: './text-input.html',
  styleUrl: './text-input.scss'
})
export class TextInput {
  @Input() element: any = null;
  constructor() {

  }
}
