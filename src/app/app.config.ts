import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { provideHttpClient } from '@angular/common/http';
import {ApplicationConfig, inject, provideBrowserGlobalErrorListeners, provideZoneChangeDetection} from '@angular/core';
import { InMemoryCache } from '@apollo/client/core';
import {environment} from '../environments/environment';
import {provideRouter, withInMemoryScrolling} from '@angular/router';
import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      return {
        link: httpLink.create({uri: environment.server_graphql_url}),
        cache: new InMemoryCache()
      }
    }),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      })
    )
  ]
}
