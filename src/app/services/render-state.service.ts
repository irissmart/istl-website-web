import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RenderStateService {
  private _isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this._isBrowser = isPlatformBrowser(platformId);
  }

  get isBrowser(): boolean {
    return this._isBrowser;
  }

  whenReady(): Promise<void> {
    if (!this._isBrowser) {
      return Promise.resolve();
    }
    
    return new Promise(resolve => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', () => resolve());
      }
    });
  }
}