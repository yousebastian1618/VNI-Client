import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {DocumentNode} from '@apollo/client';
import {Subscription} from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import {HomeService} from './home-service';
import {StatusService} from './status-service';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GqlService {
  timeout: any = null;
  timeoutSeconds: number = 5500;
  queued: any = null;
  undoAction: () => void = () => {};
  constructor(
    private apollo: Apollo,
    private homeService: HomeService,
    private statusService: StatusService,
    private cookieService: CookieService
  ) {
  }
  undo() {
    this.undoAction();
    clearTimeout(this.timeout);
    this.undoAction = () => {};
    this.queued = null;
  }

  gqlQuery<TData = any>(query: DocumentNode, needAuth: boolean = true, message?: string, nextCallback?: (data: TData) => void, errorCallback?: (err: any) => void, loading: boolean = false): Subscription {
    if (loading) {
      this.homeService.startLoading();
    }
    let headers = new HttpHeaders({});
    if (needAuth) {
      headers = headers.set('Authorization', this.cookieService.get('accessToken'))
    }
    return this.apollo.query<any>({
      query: query,
      context: { headers },
    }).subscribe({
      next: response => {
        nextCallback ? nextCallback(response.data) : ''
        this.homeService.stopLoading();
        if (message && message !== '') {
          this.statusService.showStatus(
            'success', message
          )
        }
      },
      error: (err: any) => {
        if (err.status === 503 && err.error.status == 'UNDER_MAINTENANCE') return;
        let errorMessage = typeof(err) === "object" ? err.message : err;
        errorCallback ? errorCallback(err) : ''
        this.homeService.stopLoading();
        this.statusService.showStatus('error', `Something went wrong: ${errorMessage}}`);
      }
    })
  }

  gqlMutation(mutation: DocumentNode, needAuth: boolean = true, variables?: Record<string, any>, message: string = '', nextCallback?: (data?: any) => void, errorCallback?: (err?: any) => void, loading: boolean = false, undo: boolean = false, undoCallback?: () => void) {
    if (loading) {
      this.homeService.startLoading();
    }
    let headers = new HttpHeaders({});
    if (needAuth) {
      headers = headers.set('Authorization', this.cookieService.get('accessToken'))
    }
    const opts: any = {
      mutation,
      variables,
      context: { headers }
    };
    if (undo) {
      if (this.queued) {
        this.queued();
      }
      this.undoAction = undoCallback!;
      this.gqlMutationTimer(opts, message, nextCallback, errorCallback, undoCallback);
      this.queued = () => this.gqlMutationTimer(opts, message, nextCallback, errorCallback, undoCallback, true);
      return;
    }
    return this.apollo.mutate<any>(
      opts,
    )
    .subscribe({
      next: response => {
        nextCallback ? nextCallback(response.data) : '';
        if (message && message !== '') {
          this.statusService.showStatus('success', message);
        }
        this.homeService.stopLoading();
      },
      error: err => {
        if (err.status === 503 && err.error.status == 'UNDER_MAINTENANCE') return;
        errorCallback ? errorCallback(err) : '';
        this.homeService.stopLoading();
        this.statusService.showStatus('error', `Something went wrong: ${err}}`);
      }
    })
  }
  gqlMutationTimer(opts: any, message: string, nextCallback: any, errorCallback: any, undoCallback: any, skip: boolean = false): any {
    if (skip) {
      return this.apollo.mutate<any>(
        opts,
      ).subscribe({
        next: () => {
          clearTimeout(this.timeout);
        }
      });
    }
    nextCallback ? nextCallback() : null;
    if (message && message !== '') {
      this.statusService.showStatus('success', message, true);
    }
    errorCallback ? errorCallback() : null;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      return this.apollo.mutate<any>(
        opts,
      ).subscribe({
        next: () => {
          this.undoAction = () => {};
          clearTimeout(this.timeout);
          this.queued = null;
        }
      });
    }, this.timeoutSeconds);
  }
}
