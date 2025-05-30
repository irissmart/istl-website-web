import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private apiBaseUrl = `${environment.baseUrl}`;
  private clientId!: string;
  private sessionId!: string;
  private readonly isBrowser: boolean;
  private readonly document: Document;

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) document: any,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.document = document;
    
    if (this.isBrowser) {
      this.initializeTracking();
    } else {
      this.clientId = 'server-side-' + this.generateUUID();
      this.sessionId = 'server-session-' + this.generateUUID();
    }
  }

  private initializeTracking(): void {
    const isFirstVisit = !localStorage.getItem('hasVisitedBefore');
  
    this.clientId = this.getOrCreateClientId();
    this.sessionId = this.generateSessionId();
  
    if (isFirstVisit) {
      console.log("Tracking first visit");
      this.trackFirstVisit(window.location.pathname);
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }
  

  private generateSessionId(): string {
    return 'session-' + Math.random().toString(36).substring(2, 15);
  }

  private getOrCreateClientId(): string {
    let clientId = localStorage.getItem('clientId');
    if (!clientId) {
      clientId = 'client-' + this.generateUUID();
      localStorage.setItem('clientId', clientId);
    }
    return clientId;
  }

  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  private trackFirstVisit(pageUrl: string): void {
    console.log("inside func")
    const data = {
      pageUrl: pageUrl,
      userAgent: navigator.userAgent,
      referrer: this.document.referrer,
      clientId: this.clientId,
      sessionId: this.sessionId,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    this.http.post(`${this.apiBaseUrl}/VisitorStat`, data).subscribe({
      next: () => console.debug('First visit tracked successfully'),
      error: (err) => console.error('Error tracking first visit', err)
    });
  }

  public getVisitStats(startDate?: Date, endDate?: Date) {
    let params: { [key: string]: string } = {};

    if (startDate) {
      params['startDate'] = startDate.toISOString();
    }

    if (endDate) {
      params['endDate'] = endDate.toISOString();
    }

    return this.http.get(`${this.apiBaseUrl}/VisitorStats`, { params });
  }
}
