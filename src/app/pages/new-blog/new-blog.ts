import {Component, OnDestroy, OnInit} from '@angular/core';
import {Icon} from "../../components/icon/icon";
import {Location} from '@angular/common';
import {BlogService} from '../../services/blog-service';
import {Form} from '../../components/form/form';
import {Buttons} from '../../components/buttons/buttons';
import {ADD_NEW_PARAGRAPH_BUTTONS, PREVIEW_NEW_BLOG, SUBMIT_BLOG_BUTTONS} from '../../objects/buttons';
import {NewParagraph} from '../new-paragraph/new-paragraph';
import {FileService} from '../../services/file-service';

@Component({
  selector: 'app-new-blog',
  imports: [
    Icon,
    Form,
    Buttons,
    NewParagraph,
  ],
  templateUrl: './new-blog.html',
  styleUrl: './new-blog.scss'
})
export class NewBlog implements OnInit, OnDestroy {
  constructor(
    private location: Location,
    private blogService: BlogService,
    private fileService: FileService
  ) {

  }
  ngOnInit() {
    this.blogService.crudState = sessionStorage.getItem('crudState')!;
    this.blogService.setNewBlogForm();
    const sessionStorageBlogData = sessionStorage.getItem('blogData');
    if (sessionStorageBlogData !== null) {
      this.blogService.fillNewBlogForm(JSON.parse(sessionStorageBlogData));
    }
  }
  goBack() {
    this.location.back();
  }
  getBlogCrudState() {
    return this.blogService.crudState;
  }
  async swapOrder(index1: number, index2: number) {
    await this.blogService.swapParagraphOrder(index1, index2);
  }
  getNewBlogForm() {
    return this.blogService.getNewBlogForm();
  }
  getNewBlogParagraphForm() {
    return this.blogService.getNewBlogParagraphsForm()
  }
  addNewParagraph() {
    this.blogService.addNewBlogParagraphs();
  }
  getAddNewParagraphButton() {
    return ADD_NEW_PARAGRAPH_BUTTONS;
  }
  getPreviewButtons() {
    return PREVIEW_NEW_BLOG;
  }
  getSubmitBlogButtons() {
    return SUBMIT_BLOG_BUTTONS;
  }
  getPreviewTitle() {
    return this.blogService.getPreviewingData().title;
  }
  getPreviewSubtitle() {
    return this.blogService.getPreviewingData().subtitle;
  }
  getPreviewAuthor() {
    return this.blogService.getPreviewingData().author;
  }
  getPreviewParagraphs() {
    return this.blogService.getPreviewingData().paragraphs;
  }
  isPreviewing() {
    return this.blogService.previewing;
  }
  async ngOnDestroy() {
    this.blogService.resetNewBlogForm();
    sessionStorage.clear();
    await this.fileService.clear();
  }
}
