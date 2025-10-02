import {Component, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalService } from './services/modal-service';
import {Modal} from './components/modal/modal';
import {ProductServices} from './services/product-services';
import {Loading} from './components/loading/loading';
import {HomeService} from './services/home-service';
import {StatusBar} from './components/status-bar/status-bar';
import {StatusService} from './services/status-service';
import {UserService} from './services/user-service';
import {BlogService} from './services/blog-service';
import {MaintenanceService} from './services/maintenance-service';
import {Buttons} from './components/buttons/buttons';
import {CLOSE_BUTTONS} from './objects/buttons';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Modal, Loading, StatusBar, Buttons],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('VNI-Client');
  constructor(
    private modalService: ModalService,
    private productService: ProductServices,
    private blogService: BlogService,
    private homeService: HomeService,
    private statusService: StatusService,
    private userService: UserService,
    private maintenanceService: MaintenanceService
  ) {

  }
  ngOnInit() {
    this.maintenanceService.getMaintenance();
    this.userService.retrieveUserByToken();
    this.blogService.fetchBlogs();
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
  getCloseButtons() {
    return CLOSE_BUTTONS;
  }
  closeStatus() {
    this.statusService.closeStatus()
  }
}
