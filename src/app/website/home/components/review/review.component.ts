import SwiperCore, { Swiper } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'app/services/api.service';

register();
SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-review',
  imports: [CommonModule],
  templateUrl: './review.component.html',
  styleUrls: ['../../home.component.scss', './review.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReviewComponent implements AfterViewInit {

  reviews : any[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: any, private apiService: ApiService, private http: HttpClient) { }

  ngOnInit(): void {
    this.apiService.getAllHomeTestimonials().subscribe({
      next: (response) => {
        if (response) {
          this.reviews = response.map(item => ({
            description: item.comment,
            by: item.clientName,
            designation: item.clientOccupation,
            image: item.imagePath
          }));
        }
      },
      error: (err) => {
        console.error('Error fetching Section:', err)
      }
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const swiperEl3 = document.querySelector('.swiper-container3') as HTMLElement & { swiper: Swiper; };
      if (swiperEl3) {
        Object.assign(swiperEl3, {
          slidesPerView: 1,
          speed: 250,
          loop: false,
          pagination: false,
          navigation: {
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          },
          breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 10
            }
          }
        });
        // @ts-ignore
        swiperEl3.initialize();
      }
    }
  }
}
