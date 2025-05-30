import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay, HydrationFeature, withI18nSupport } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AnalyticsService } from './services/analytics.service';
import { APP_INITIALIZER } from '@angular/core';
import { initializeAnalytics } from './app.initializer';
// import { MatInputModule } from '@angular/material/input';
// import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({
      eventCoalescing: true,
      runCoalescing: true
    }),
    provideRouter(routes, withInMemoryScrolling({
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
    }), withViewTransitions({
      skipInitialTransition: true,
      onViewTransitionCreated(transition) {
        console.log('View transition created', transition);
      }
    })),
    provideClientHydration(
      withEventReplay()
    ), 
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([]), withFetch()),
    importProvidersFrom(
      MatSnackBarModule
    ),
    AnalyticsService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAnalytics,
      multi: true
    } ]
};
