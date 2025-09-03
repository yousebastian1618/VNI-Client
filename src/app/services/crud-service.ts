import { Injectable } from '@angular/core';
import {ModalService} from './modal-service';
import {ProductServices} from './product-services';
import {BlogService} from './blog-service';
import {ErrorService} from './error-service';
import {InquiryService} from './inquiry-service';
import {StatusService} from './status-service';
import {UserService} from './user-service';

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
    private userService: UserService
  ){}
  handleCrud(button: any, data: any) {
    let buttonName = typeof(button) === 'string' ? button : button.func;
    const [crud, what, id] = buttonName.split('|');
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
      }
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
    }
  }
}
