import { Injectable } from '@angular/core';
import {ModalService} from './modal-service';
import {ProductServices} from './product-services';
import {BlogService} from './blog-service';
import {ErrorService} from './error-service';
import {InquiryService} from './inquiry-service';
import {StatusService} from './status-service';
import {UserService} from './user-service';
import {Location} from '@angular/common';
// @ts-ignore
import * as uuid from 'uuid';
import {FileService} from './file-service';
import {GqlService} from './gql-service';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  constructor(
    private modalService: ModalService,
    private productService: ProductServices,
    private blogService: BlogService,
    private errorService: ErrorService,
    private inquiryService: InquiryService,
    private statusService: StatusService,
    private userService: UserService,
    private fileService: FileService,
    private location: Location,
    private gqlService: GqlService
  ){}
  async goInContainer(sectionId: string | undefined) {
    if (!sectionId) return;
    if (sectionId === 'logout') {
      await this.handleCrud(sectionId, null);
      return;
    }
    const container = document.querySelector('.home-container') as HTMLElement | null;
    const target = document.querySelector(`.${CSS.escape(sectionId)}`) as HTMLElement | null; // or use #id
    if (!container || !target) return;
    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const headerOffset = 0; // adjust as needed
    const top = targetRect.top - containerRect.top + container.scrollTop - headerOffset;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }
  async handleCrud(button: any, data: any) {
    let buttonName = typeof(button) === 'string' ? button : button.func;
    const [crud, what, id] = buttonName.split('|');
    if (crud === 'undo') {
      this.gqlService.undo();
      return;
    }
    if (crud === 'cancel') {
      this.location.back();
      return;
    }
    if (crud === 'login') {
      if (this.errorService.checkError(this.userService.getLoginForm())) {
        this.statusService.showStatus('error', this.errorService.errorMessage);
        return;
      }
      this.userService.login();
      return;
    }
    if (crud === 'logout') {
      this.userService.logout();
      return;
    }
    if (crud === 'select') {
      if (what === 'images') {
        this.productService.toggleSelectingImage();
        if (this.productService.selectingImages) {
          this.productService.toggleSortingImage(false);
        }
        return;
      }
      if (what === 'blogs') {
        this.blogService.toggleSelectingBlogs();
        if (this.blogService.selectingBlogs) {
          this.blogService.toggleSortingBlogs(false);
        }
        return;
      }
      return;
    }
    if (crud === 'sort') {
      if (what === 'images') {
        this.productService.toggleSortingImage();
        if (this.productService.sortingImages) {
          this.productService.toggleSelectingImage(false);
        }
        return;
      }
      if (what === 'blogs') {
        this.blogService.toggleSortingBlogs();
        if (this.blogService.sortingBlogs) {
          this.blogService.toggleSelectingBlogs(false);
        }
        return;
      }
      return;
    }
    if (crud === 'close') {
      if (what === 'modal') {
        this.modalService.modalOff();
        return;
      }
      return;
    }
    if (crud === 'view') {
      if (what === 'image') {
        this.modalService.modalOn({
          type: 'view|image',
          title: '',
          subtitle: '',
          main: data,
          buttons: [],
        })
        return;
      }
      if (what === 'images') {
        this.modalService.modalOn({
          type: 'view|images',
          title: "Customer's Products",
          subtitle: '',
          main: this.productService.productsSubject.getValue().map((p: any) => ({ ...p })),
          buttons: []
        })
        return;
      }
      return;
    }
    if (crud === 'reorder') {
      if (what === 'images') {
        this.productService.reorderProducts();
        return;
      }
      if (what === 'blogs') {
        this.blogService.reorderBlogs();
        return;
      }
      return;
    }
    if (crud === 'unselect') {
      if (what === 'blogs') {

      }
      return;
    }
    if (crud === 'delete') {
      if (what === 'images') {
        this.productService.deleteImages();
        return;
      }
      if (what === 'paragraph') {
        this.blogService.removeParagraph(parseInt(id));
      }
      if (what === 'blog') {
        this.blogService.deleteBlogSingle(id);
        return;
      }
      if (what === 'blogs') {
        this.blogService.deleteBlogsMultiple();
        return;
      }
      return;
    }
    if (crud === 'submit') {
      button.loading = true;
      if (what === 'inquiry') {
        if (this.errorService.checkError(this.inquiryService.getInquiryForm())) {
          this.statusService.showStatus('error', this.errorService.errorMessage);
          return;
        }
        this.inquiryService.sentInquiry();
        return;
      }
      if (what === 'new-blog') {
        let copiedGetPreviewingData = JSON.parse(JSON.stringify(this.blogService.getPreviewingData()));
        if (this.blogService.crudState === 'create') {
          for (let i = 0; i < copiedGetPreviewingData.paragraphs.length; i++) {
            let imageFile = await this.fileService.getFile(`blog_image_${i}`);
            copiedGetPreviewingData.paragraphs[i].image = imageFile ? uuid.v4() : null;
          }
        } else if (this.blogService.crudState === 'update') {
          let targetBlogId = sessionStorage.getItem('blogUid');
          copiedGetPreviewingData.id = targetBlogId;
          let targetBlog = this.blogService.blogsSubject.getValue().find((b: any) => b.id === targetBlogId);
          console.log('targetBlog: ', targetBlog);
          for (let i = 0; i < copiedGetPreviewingData.paragraphs.length; i++) {
            let imageFile = await this.fileService.getFile(`blog_image_${i}`);
            copiedGetPreviewingData.paragraphs[i].index = i;
            copiedGetPreviewingData.paragraphs[i].id = targetBlog.paragraphs[i] === undefined ? '-1' : targetBlog.paragraphs[i].id
            if (imageFile) {
              if (targetBlog.paragraphs[i]) {
                if (targetBlog.paragraphs[i].image) {
                  copiedGetPreviewingData.paragraphs[i].image = targetBlog.paragraphs[i].image;
                } else {
                  copiedGetPreviewingData.paragraphs[i].image = null;
                }
              } else {
                copiedGetPreviewingData.paragraphs[i].image = copiedGetPreviewingData.paragraphs[i].image ? uuid.v4() : null;
              }
            } else {
              copiedGetPreviewingData.paragraphs[i].image = null;
            }
          }
        }
        console.log(copiedGetPreviewingData);
        await this.blogService.crudBlog(copiedGetPreviewingData);
        return;
      }
      return;
    }
    if (crud === 'new') {
      if (what === 'paragraph') {
        this.blogService.addNewBlogParagraphs()
        return;
      }
      if (what === 'blog') {

      }
      return;
    }
    if (crud === 'preview') {
      if (what === 'blog') {
        if (this.errorService.checkError(this.blogService.getNewBlogForm())) {
          this.statusService.showStatus('error', this.errorService.errorMessage);
          return;
        }
        await this.blogService.setPreviewingData();
        this.blogService.toggleReviewingBlog(true);
        return;
      }
      return;
    }
    if (crud === 'goback') {
      if (what === 'crud-blog') {
        this.blogService.toggleReviewingBlog(false);
        return;
      }
      return;
    }
  }
}
