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
  constructor(
    private apollo: Apollo,
    private homeService: HomeService,
    private statusService: StatusService,
    private cookieService: CookieService
  ) {
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
        let errorMessage = typeof(err) === "object" ? err.message : err;
        errorCallback ? errorCallback(err) : ''
        this.homeService.stopLoading();
        this.statusService.showStatus('error', `Something went wrong: ${errorMessage}}`);
      }
    })
  }

  gqlMutation(mutation: DocumentNode, needAuth: boolean = true, variables?: Record<string, any>, message: string = '', nextCallback?: (data: any) => void, errorCallback?: (err: any) => void, loading: boolean = false): Subscription {
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
        errorCallback ? errorCallback(err) : '';
        this.homeService.stopLoading();
        this.statusService.showStatus('error', `Something went wrong: ${err}}`);
      }
    })
  }



}
