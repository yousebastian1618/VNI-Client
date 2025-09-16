import {Component, Input} from '@angular/core';
import {TextInput} from './text-input/text-input';
import {TEXT_INPUT_OPTIONS} from '../../objects/forms';
import {Router} from '@angular/router';
import {BlogService} from '../../services/blog-service';
import {CrudService} from '../../services/crud-service';

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
    private router: Router,
    private crudService: CrudService
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
  async handleKeyDown(event: KeyboardEvent) {
    if (this.router.url === '/login') {
      if (event.key === 'Enter') {
        await this.crudService.handleCrud('login', null);
      }
    }
  }
}
