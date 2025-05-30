import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import Swiper from 'swiper';
import { forkJoin, Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-home-page',
  imports: [RouterModule, CommonModule, FontAwesomeModule],
  templateUrl: './homepage.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './homepage.component.scss'
})

export class HomePageComponent implements OnInit, OnDestroy {
  faHeadset = faHeadset;
  sections: any[] = [];
  pageId: number = 0;
  faCircleCheck = faCircleCheck;
  serviceCategories: any[] = [];
  reviews: any[] = [];
  faStarRegular = faStarRegular;
  private destroy$ = new Subject<void>();
  isLoading: boolean = true;
  isBrowser : boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: any, private apiService: ApiService, private router: Router, private route: ActivatedRoute) { this.isBrowser = isPlatformBrowser(this.platformId); }

  ngOnInit(): void {
    this.loadData();
  }


  private loadData(): void {
    this.isLoading = true; 
  
    forkJoin([
      this.apiService.getSectionsByPageId(1).pipe(takeUntil(this.destroy$)),
      this.apiService.getAllClientServiceCategories(),
      this.apiService.getAllHomeTestimonials()
    ]).subscribe({
      next: ([sections, categories, testimonials]) => {
        this.sections = sections.sections;
        this.pageId = sections.pageId;
        
        this.serviceCategories = categories.map((item: any) => ({
          id: item.id,
          name: item.serviceCategoryName,
          description: item.description,
          image: item.imagePath ?? 'assets/default-image.jpg'
        }));
  
        this.reviews = testimonials.map(item => ({
          description: item.comment,
          by: item.clientName,
          designation: item.clientOccupation,
          image: item.imagePath
        }));
        this.isLoading = false; 
        
        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => this.initializeSwipers(), 300);
        }
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.isLoading = false; 
      }
    });
  }

  navigateToDetails(categoryId: string) {
    this.router.navigate(['/service-category', categoryId]);
  }

  private initializeSwipers(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    setTimeout(() => {
      const swiperEl2 = document.querySelector('.swiper-container2') as HTMLElement | null;
      if (swiperEl2 && this.serviceCategories.length > 0) {
        new Swiper(swiperEl2, {
          slidesPerView: 'auto',
          speed: 200,
          loop: false,
          pagination: false,
          navigation: {
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          },
          breakpoints: {
            320: { slidesPerView: 2, spaceBetween: 10 },
            640: { slidesPerView: 3, spaceBetween: 10 },
            768: { slidesPerView: 4, spaceBetween: 10 },
            1024: { slidesPerView: 4, spaceBetween: 10 }
          }
        });
      }
    }, 100);
  
    setTimeout(() => {
      const swiperEl3 = document.querySelector('.swiper-container3') as HTMLElement | null;
      if (swiperEl3) {
        new Swiper(swiperEl3, {
          slidesPerView: 1,
          speed: 250,
          loop: false,
          pagination: false,
          navigation: {
            nextEl: '.custom-next-3',
            prevEl: '.custom-prev-3',
          },
          breakpoints: {
            320: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 1, spaceBetween: 10 },
            1024: { slidesPerView: 1, spaceBetween: 10 }
          }
        });
      }
    }, 100);
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.isBrowser && !this.isLoading && this.serviceCategories.length > 0) {
        this.initializeSwipers();
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackByCategoryId(index: number, category: any): string {
    return category.id;
  }
}
