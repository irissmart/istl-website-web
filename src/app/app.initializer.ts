import { inject } from '@angular/core';
import { AnalyticsService } from './services/analytics.service';

export function initializeAnalytics() {
  return () => {
    const analytics = inject(AnalyticsService);
    return Promise.resolve();
  };
}