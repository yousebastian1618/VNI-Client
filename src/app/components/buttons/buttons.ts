import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CrudService} from '../../services/crud-service';
import {ProductServices} from '../../services/product-services';
import {Icon} from '../icon/icon';
import {BlogService} from '../../services/blog-service';
import {ACCEPTABLE_UPLOADING_FILE_TYPES} from '../../objects/objects';
import {NgOptimizedImage} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-buttons',
  imports: [
    Icon,
    NgOptimizedImage
  ],
  templateUrl: './buttons.html',
  styleUrl: './buttons.scss'
})
export class Buttons {
  @Input() buttons: any[] = [];
  @Input() element: any = {};
  @Output() callBack = new EventEmitter<any>();

  constructor(
    private crudService: CrudService,
    private productService: ProductServices,
    private blogService: BlogService,
    private router: Router,
  ) {
  }
  getButtons() {
    return this.buttons;
  }
  async handleClick(event: any, button: any) {
    let targetButton = JSON.parse(JSON.stringify(button));
    if (targetButton.name === 'new|image') {
      (document.getElementById("file-upload-input") as HTMLInputElement)!.click();
      event.stopPropagation();
      return;
    }
    if (targetButton.name === 'new|blog') {
      this.blogService.crudState = 'create';
      sessionStorage.setItem('crudState', this.blogService.crudState);
      await this.router.navigate(['new-blog'])
      event.stopPropagation();
      return;
    }
    if (targetButton.name.includes('new|blog-image')) {
      this.blogService.toggleReviewingBlog(false);
      this.blogService.currentParagraphIndex = this.buttons[0].name.split('|')[2];
      (document.getElementById("file-upload-input") as HTMLInputElement)!.click();
      event.stopPropagation();
      return;
    }
    if (targetButton.name.includes('edit|blog')) {
      this.blogService.toggleReviewingBlog(false);
      this.blogService.crudState = 'update';
      sessionStorage.setItem('crudState', this.blogService.crudState);
      sessionStorage.setItem('blogUid', this.element.id);
      let blogJson = await this.blogService.blogGqlToJson(this.element);
      sessionStorage.setItem('blogData', JSON.stringify(blogJson));
      await this.router.navigate(['new-blog'])
      event.stopPropagation();
      return;
    }
    if (targetButton.name === 'delete|blog') {
      targetButton.name += `|${this.element.id}`;
      targetButton.func += `|${this.element.id}`
    }
    event.stopPropagation();
    await this.crudService.handleCrud(targetButton, this.element);
  }
  toggleButtonClass(button: any) {
    let [crud, what] = button.name.split('|');
    if (crud === 'select') {
      if (what === 'images') {
        if (this.productService.selectingImages) {
          return 'selected-button-style';
        }
        return '';
      }
      if (what === 'blogs') {
        if (this.blogService.selectingBlogs) {
          return 'selected-button-style';
        }
        return '';
      }
      return '';
    }
    if (crud === 'sort') {
      if (what === 'images') {
        if (this.productService.sortingImages) {
          return 'selected-button-style';
        }
        return '';
      }
      if (what === 'blogs') {
        if (this.blogService.sortingBlogs) {
          return 'selected-button-style';
        }
        return '';
      }
    }
    if (crud === 'unselect' || crud === 'delete') {
      if (what === 'images') {
        if (this.productService.selectingImages) {
          if (this.productService.getSelectedImages().length === 0) {
            return 'disabled';
          }
          return '';
        }
        return 'display-none';
      }
      if (what === 'blogs') {
        if (this.blogService.selectingBlogs) {
          if (!this.blogService.areSomeBlogsSelected()) {
            return 'disabled';
          }
          return '';
        }
        return 'display-none';
      }
      if (what === 'blog') {
        if (this.blogService.selectingBlogs || this.blogService.sortingBlogs) {
          return 'display-none';
        }
        return '';
      }
      return '';
    }
    if (crud === 'edit') {
      if (what === 'blog') {
        if (this.blogService.selectingBlogs || this.blogService.sortingBlogs) {
          return 'display-none';
        }
      }
      return '';
    }
    if (crud === 'reorder') {
      if (what === 'images') {
        if (this.productService.sortingImages) {
          if (this.productService.imageSortingChanged) {
            return '';
          }
        }
        return 'display-none';
      }
      if (what === 'blogs') {
        if (this.blogService.sortingBlogs) {
          if (this.blogService.blogSorted) {
            return '';
          }
        }
        return 'display-none';
      }
    }
    return '';
  }
  getAcceptedFileInputType() {
    return ACCEPTABLE_UPLOADING_FILE_TYPES;
  }
  toggleMultipleUpload() {
    return this.router.url !== '/new-blog';
  }
  async uploadContent(target: any) {
    if (this.router.url === '/new-blog') {
      await this.addingParagraphImage(target);
      return;
    }
    // this.contentService.totalUploadingProgress = {};
    this.productService.uploading = true;
    this.productService.numberOfUploadingFiles = target.files.length;
    this.productService.remainingFilesToUpload = target.files.length;
    for (let i=0; i<this.productService.numberOfUploadingFiles; i++) {
      // this.contentService.totalUploadingProgress[i] = 0;
      let file = target.files[i];
      let type = file.type.split('/')[0];
      if (!this.getAcceptedFileInputType()[0].includes(type)) {
        // this.homeService.activateStatusBar({
        //   status: 'error',
        //   statusMessage: `Invalid File Type "${file.name}"`,
        //   extraStatusMessage: "Only images (jpg, jpeg, png, gif) or videos are supported."
        // })
        // this.contentService.numberOfInvalidContents += 1;
        return;
      }

      this.productService.uploadProductImage(file);
      // let newUUID = uuid.v4();
      // const formData = new FormData();
      // formData.append("file", file);
      // formData.append('type', type);
      // formData.append('uuid', newUUID);
      // this.productService.uploadImage(formData, i);
    }
  }
  async addingParagraphImage(target: any) {
    let file = target.files[0];
    this.callBack.emit({ file });
  }
}
