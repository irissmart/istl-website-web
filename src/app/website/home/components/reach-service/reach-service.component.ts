import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Inject, Input, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import Swiper from 'swiper';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'app/services/api.service';
import { Router } from '@angular/router';

register();

@Component({
  selector: 'app-reach-service',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './reach-service.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrls: ['./reach-service.component.scss']
})

export class ReachServiceComponent implements AfterViewInit {
  @Input() section: any;
  serviceCategories: any[] = [];

  faStarRegular = faStarRegular;

  constructor(@Inject(PLATFORM_ID) private platformId: any, private apiService: ApiService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getAllClientServiceCategories().subscribe({
      next: (response) => {
        if (response) {
          this.serviceCategories = response.map((item: any) => ({
            id: item.id,
            name: item.serviceCategoryName,
            description: item.description,
            image: item.imagePath ?? 'assets/default-image.jpg'
          }));
        }
      },
      error: (err) => {
        console.error('Error fetching Section:', err);
      }
    });
  }

  navigateToDetails(categoryId: string) {
    this.router.navigate(['/service-category', categoryId]);
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const swiperEl2 = document.querySelector('.swiper-container2') as HTMLElement & { swiper: Swiper; };
      if (swiperEl2) {
        Object.assign(swiperEl2, {
          slidesPerView: 3,
          speed: 200,
          loop: false,
          pagination: false,
          navigation: {
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          },
          breakpoints: {
            320: {
              slidesPerView: 2,
              spaceBetween: 10
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 10
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 10
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10
            }
          }
        });
        // @ts-ignore
        swiperEl2.initialize();
      }
    }
  }


}
