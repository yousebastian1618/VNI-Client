import {Component, Input, OnInit} from '@angular/core';
import {Form} from '../../components/form/form';
import {Buttons} from '../../components/buttons/buttons';
import {ADD_NEW_BLOG_IMAGE_BUTTONS, REMOVE_PARAGRAPH_BUTTONS} from '../../objects/buttons';
import {CrudService} from '../../services/crud-service';
import {FileService} from '../../services/file-service';
import {AsyncPipe} from '@angular/common';
import {BehaviorSubject} from 'rxjs';
import {Icon} from '../../components/icon/icon';
import {BlogService} from '../../services/blog-service';

@Component({
  selector: 'app-new-paragraph',
  imports: [
    Form,
    Buttons,
    AsyncPipe,
    Icon
  ],
  templateUrl: './new-paragraph.html',
  styleUrl: './new-paragraph.scss'
})
export class NewParagraph implements OnInit {
  paragraphImageUrl$ = new BehaviorSubject<string | null>(null);
  @Input() paragraph: any = null;
  @Input() index: number = -1;
  indexedButtons: any = null;
  constructor(
    private crudService: CrudService,
    private fileService: FileService,
    private blogService: BlogService
  ) {
  }
  async ngOnInit() {
    this.indexedButtons = JSON.parse(JSON.stringify(ADD_NEW_BLOG_IMAGE_BUTTONS[0]));
    this.indexedButtons.name += `|${this.index}`;
    this.indexedButtons.func += `|${this.index}`;
    let pImage = await this.fileService.getFile(`blog_image_${this.index}`);
    if (pImage) {
      const url = URL.createObjectURL(pImage);
      queueMicrotask(() => this.paragraphImageUrl$.next(url));
    }
  }
  getRemoveParagraphButtons() {
    let button = JSON.parse(JSON.stringify(REMOVE_PARAGRAPH_BUTTONS[0]));
    button.name += `|${this.index}`;
    button.func += `|${this.index}`;
    return button;
  }
  getAddBlogImageButtons() {
    return [this.indexedButtons];
  }
  async removeBlogParagraph() {
    await this.crudService.handleCrud(this.getRemoveParagraphButtons(), null);
  }
  onImageChosen(e: { file: File }) {
    const url = URL.createObjectURL(e.file);
    queueMicrotask(() => this.paragraphImageUrl$.next(url));
    this.fileService.saveFile(`blog_image_${this.index}`, e.file);

  }
  async removeImage() {
    await this.fileService.removeFile(`blog_image_${this.index}`);
    this.paragraphImageUrl$.next(null);
  }
}
