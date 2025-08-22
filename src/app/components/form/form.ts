import {Component, Input} from '@angular/core';
import {TextInput} from './text-input/text-input';
import {TEXT_INPUT_OPTIONS} from '../../objects/forms';

@Component({
  selector: 'app-form',
  imports: [
    TextInput
  ],
  templateUrl: './form.html',
  styleUrl: './form.scss'
})
export class Form {
  @Input() form: any = null;
  @Input() buttons: string[] = [];
  constructor(
  ) {
  }
  getTextInputOptions() {
    return TEXT_INPUT_OPTIONS;
  }
}
