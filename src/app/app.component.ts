import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RenderStateService } from './services/render-state.service';
import { filter, Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { AnalyticsService } from './services/analytics.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'iris';
  isBrowser: boolean = false;
  isReady: boolean = false;
  showHeaderFooter = false;
  private routerSub!: Subscription;

  constructor(
    private router: Router,
    private renderState: RenderStateService,
    private analytics: AnalyticsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {

    this.isBrowser = isPlatformBrowser(this.platformId);
    
  }

  ngOnInit() {
    this.updateHeaderFooterVisibility();

    // if (typeof window !== 'undefined') {
    //   this.analytics.trackPageView(window.location.pathname);
    // }
    
    // Subscribe to route changes
    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateHeaderFooterVisibility();
      });

    if (this.isBrowser) {
      document.documentElement.classList.add('ready');
      
      // Redirect if on root route
      if (window.location.pathname === '/') {
        this.renderState.whenReady().then(() => {
          this.router.navigate(['/home']);
        });
      }
    }
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      setTimeout(() => {
        document.documentElement.classList.add('fully-ready');
        this.isReady = true;
      }, 100);
    }
  } 

  private updateHeaderFooterVisibility(): void {
    let route = this.router.routerState.snapshot.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    this.showHeaderFooter = !route.data?.['hideHeaderFooter'];
  }

  ngOnDestroy() {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }
}
