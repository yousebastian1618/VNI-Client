import {Component, OnDestroy} from '@angular/core';
import {ModalService} from '../../services/modal-service';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import {CrudService} from '../../services/crud-service';
import {Buttons} from '../buttons/buttons';
import {ADMIN_MANAGE_IMAGES_BUTTONS} from '../../objects/buttons';
import {ProductServices} from '../../services/product-services';
import {UserService} from '../../services/user-service';

@Component({
  selector: 'app-modal',
  imports: [
    NgOptimizedImage,
    Buttons,
    AsyncPipe,
  ],
  templateUrl: './modal.html',
  styleUrl: './modal.scss'
})
export class Modal implements OnDestroy {
  draggingElement: any = null;
  dragOverElement: any = null;
  constructor(
    private modalService: ModalService,
    private crudService: CrudService,
    private productService: ProductServices,
    private userService: UserService
  ) {
  }
  getProductImages() {
    return this.productService.getProductImages();
  }
  getModalType() {
    return this.modalService.type.split('|')[0];
  }
  getModalTypeData() {
    return this.modalService.type.split('|')[1];
  }
  getModalMain() {
    return this.modalService.main;
  }
  getProductImage(img: any) {
    return this.productService.getImageSrc(img);
  }
  async viewImage(image: any) {
    if (this.productService.selectingImages) {
      this.productService.toggleSelectImage(image);
      return;
    }
    if (this.productService.sortingImages) {
      return;
    }
    let button = "view|image";
    this.crudService.handleCrud(button, image);
  }
  isAdmin() {
    return this.userService.isAdmin();
  }
  toggleDraggable() {
    return this.productService.sortingImages;
  }
  getManageImagesButtons() {
    return ADMIN_MANAGE_IMAGES_BUTTONS;
  }
  toggleImageClass(img: any) {
    if (this.productService.selectingImages) {
      if (!this.productService.isImageSelected(img)) {
        return "white-opacity";
      }
    }
    return "";
  }
  isSortingImage() {
    return this.productService.sortingImages;
  }
  onDragStart(img: any) {
    this.draggingElement = img;
  }
  onDragEnter(event: any, img: any) {
    this.dragOverElement = img;
    this.swap();
    event.preventDefault();
  }
  onDragLeave(event: any) {
    this.dragOverElement = null;
    event.preventDefault();
  }
  onDragEnd() {
    this.productService.imageSortingChanged = true;
    this.draggingElement = null;
    this.dragOverElement = null;
  }
  swap() {
    let originalDraggingElementIndex = this.draggingElement.index;
    let originalDragOverElementIndex = this.dragOverElement.index;
    if (originalDraggingElementIndex === originalDragOverElementIndex) return;
    this.draggingElement.index = this.dragOverElement.index;
    this.getModalMain().forEach((element: any) => {
      if (originalDraggingElementIndex < originalDragOverElementIndex) {
        if (element.id !== this.draggingElement.id && element.index > originalDraggingElementIndex && element.index <= this.draggingElement.index) {
          element.index -= 1;
        }
      } else {
        if (element.id !== this.draggingElement.id && element.index < originalDraggingElementIndex && element.index >= this.draggingElement.index) {
          element.index += 1;
        }
      }
    })
    this.getModalMain().sort((a: any, b: any) => a.index - b.index);
    // this.productService.productsSubject.next([...this.getModalMain()])
  }
  ngOnDestroy() {
    this.productService.toggleSortingImage(false);
    this.productService.toggleSelectingImage(false);
  }
}
