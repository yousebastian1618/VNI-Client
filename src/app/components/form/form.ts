import {Component, Input} from '@angular/core';
import {TextInput} from './text-input/text-input';
import {TEXT_INPUT_OPTIONS} from '../../objects/forms';
import {Router} from '@angular/router';
import {BlogService} from '../../services/blog-service';

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
    private blogService: BlogService,
    private router: Router
  ) {
  }
  getTextInputOptions() {
    return TEXT_INPUT_OPTIONS;
  }
  async handleChange() {
    if (this.router.url === '/new-blog') {
      await this.blogService.saveToSession();
    }
  }
}
