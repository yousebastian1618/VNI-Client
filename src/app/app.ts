import {Component, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalService } from './services/modal-service';
import {Modal} from './components/modal/modal';
import {Icon} from './components/icon/icon';
import {ProductServices} from './services/product-services';
import {Loading} from './components/loading/loading';
import {HomeService} from './services/home-service';
import {StatusBar} from './components/status-bar/status-bar';
import {StatusService} from './services/status-service';
import {UserService} from './services/user-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Modal, Icon, Loading, StatusBar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('VNI-Client');
  constructor(
    private modalService: ModalService,
    private productService: ProductServices,
    private homeService: HomeService,
    private statusService: StatusService,
    private userService: UserService,
  ) {

  }
  ngOnInit() {
    this.userService.retrieveUserByToken();
    this.productService.fetchProductsImages();
  }
  getIsModalOn() {
    return this.modalService.isModalOn;
  }
  closeModal() {
    this.modalService.modalOff();
  }
  isLoading() {
    return this.homeService.loading;
  }
  getAppClass() {
    if (this.getIsModalOn() || this.isLoading()) {
      return 'disable-opacity';
    }
    return '';
  }
  isStatusShowing() {
    return this.statusService.showingStatus;
  }
  getStatusStyle() {
    if (this.statusService.type === 'success') {
      return 'background-color: var(--default-color);'
    }
    if (this.statusService.type === 'warning') {
      return 'background-color: var(--default-color3);'
    }
    if (this.statusService.type === 'error') {
      return 'background-color: var(--default-color-red);'
    }
    return '';
  }
  closeStatus() {
    this.statusService.closeStatus()
  }
}
