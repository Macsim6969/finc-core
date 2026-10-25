import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';

import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';

import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideRouter(appRoutes),

    provideHttpClient(),

    provideTranslateService({
      fallbackLang: 'en',
      lang: 'en',

      loader: provideTranslateHttpLoader({
        resources: [
          {
            prefix: '/i18n/common/',
            suffix: '.json',
          },
          {
            prefix: '/i18n/identity/',
            suffix: '.json',
          },
        ],
        failOnError: true,
      }),
    }),

    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
