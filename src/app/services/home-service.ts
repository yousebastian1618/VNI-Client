import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  loading: boolean = false;
  loadingCount: number = 0;
  constructor() {
  }
  startLoading() {
    // this.loadingCount += 1;
    this.loading = true;
  }
  stopLoading() {
    this.loading = false;
    // this.loadingCount -= 1;
    // if (this.loadingCount <= 0) {
    //   this.loading = false;
    // }
  }
}
