import {Injectable} from '@angular/core';
import {GqlService} from './gql-service';
import {CREATE_PRODUCT_GQL, DELETE_PRODUCTS_GQL, PRODUCTS_GQL, REORDER_PRODUCTS_GQL} from '../objects/gql';
import {HttpClient, HttpEventType, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {HomeService} from './home-service';
import {ModalService} from './modal-service';
import {StatusService} from './status-service';

@Injectable({
  providedIn: 'root'
})
export class ProductServices {
  selectedImages: any[] = [];
  selectingImages: boolean = false;
  sortingImages: boolean = false;
  products: any[] = [];
  imageSortingChanged: boolean = false;
  productsSubject = new BehaviorSubject<any[]>([]);
  products$ = this.productsSubject.asObservable();
  uploading: boolean = false;
  uploadingProgress: number = 0;
  numberOfUploadingFiles: number = 0;
  remainingFilesToUpload: number = 0;
  constructor(
    private gqlService: GqlService,
    private http: HttpClient,
    private homeService: HomeService,
    private modalService: ModalService,
    private statusService: StatusService
  ) {
  }
  fetchProductsImages() {
    return this.gqlService.gqlQuery(
      PRODUCTS_GQL,
      false,
      '',
      (response: any) => {
        this.productsSubject.next([...response.products]);
      }
    )
  }
  getProductImages() {
    return this.products$;
  }
  uploadProductImage(file: File) {
    this.uploadImageCreateData(file);
  }
  getImageSrc(img: any) {
    return `/api/products/image/${img.id}`
  }
  uploadImageCreateData(file: File) {
    return this.gqlService.gqlMutation(
      CREATE_PRODUCT_GQL,
      true,
      {},
      '',
      (response: any) => {
        this.uploadImageToCloud(file, response.createProduct);
      },
      () => {},
      true
    )
  }
  putToR2(uploadUrl: string, file: File, contentType: string) {
    const headers = new HttpHeaders({ 'Content-Type': contentType});
    return this.http.put(uploadUrl, file, {
      headers,
      reportProgress: true,
      observe: 'events'
    })
  }
  getUploadPresignedURL(file: File, uid: string): Observable<any> {
    return this.http.post<any>(
      `/api/products/get-upload-url/${uid}`, {
        filename: file.name,
        contentType: file.type || 'application/octet-stream'
      }
    )
  }
  uploadImageToCloud(file: File, newProduct: any) {
    if (!file) return;
    this.getUploadPresignedURL(file, newProduct.id).subscribe(({ uploadUrl, key, contentType }) => {
      this.homeService.startLoading();
      this.putToR2(uploadUrl, file, contentType).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.uploadingProgress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.uploadingProgress = 100;
          const current = this.productsSubject.getValue();
          current.sort((a: any, b: any) => a.index - b.index);
          this.productsSubject.next([...current, { ...newProduct }]);
          this.modalService.main = this.productsSubject.getValue().map((p: any) => ({ ...p }));
          this.homeService.stopLoading();
          this.statusService.showStatus(
            'success', 'Uploaded.'
          )
        }
      });
    });
  }
  reorderProducts() {
    let gqlInput = this.modalService.main.map((item: any) => {
      return {
        id: item.id,
        index: item.index
      }
    })
    return this.gqlService.gqlMutation(
      REORDER_PRODUCTS_GQL,
      true,
      { gqlInput },
      'Updated.',
      () => {
        this.productsSubject.next([...this.modalService.main]);
        this.imageSortingChanged = false;
        this.toggleSortingImage(false);
      },
      () => {},
      true
    )
  }
  deleteImages() {
    let uids = this.selectedImages.map((item: any) => item.id);
    return this.gqlService.gqlMutation(
      DELETE_PRODUCTS_GQL,
      true,
      { uids },
      'Deleted.',
      (response: any) => {
        this.productsSubject.next([...response.deleteProducts]);
        this.modalService.main = this.productsSubject.getValue().map((p: any) => ({ ...p }));
        this.toggleSelectingImage(false);
      },
      () => {},
      true
    )
  }
  getSelectedImages() {
    return this.selectedImages;
  }
  toggleSelectImage(image: any) {
    const exist = this.selectedImages.find((img: any) => img.id === image.id);
    if (exist) {
      this.selectedImages = this.selectedImages.filter((img: any) => img.id !== image.id);
    } else {
      this.selectedImages.push(image);
    }
  }
  toggleSelectingImage(toggle?: boolean) {
    this.selectingImages = toggle !== undefined ? toggle :!this.selectingImages;
    if (!this.selectingImages) {
      this.unselectAllImages();
    }
  }
  toggleSortingImage(toggle?: boolean) {
    this.imageSortingChanged = false;
    this.sortingImages = toggle !== undefined ? toggle : !this.sortingImages;
    if (!this.sortingImages) {
      this.modalService.main = [];
      this.modalService.main = this.productsSubject.getValue().map((p: any) => ({ ...p }));
      this.modalService.main.sort((a: any, b: any) => a.index - b.index);
    }
  }
  isImageSelected(image: any) {
    let found = this.selectedImages.find((img: any) => img.id === image.id);
    return found !== undefined;
  }
  unselectAllImages() {
    this.selectedImages = [];
  }
}
