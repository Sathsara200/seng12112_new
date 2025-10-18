import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  isDevMode
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { NgxsModule } from '@ngxs/store';
import { AppState } from './state/app/app.state';
import { provideServiceWorker } from '@angular/service-worker';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // ✅ Add this
import { BaseUrlInterceptor } from './services/_interceptors/base-url-interceptor/base-url-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    importProvidersFrom(
      NgxsModule.forRoot([AppState], {
        developmentMode: isDevMode(),
      }),
      HttpClientModule // ✅ Add this here
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor, // ✅ Add this
      multi: true,
    },

    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
