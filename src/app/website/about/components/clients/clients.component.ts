import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'app/services/api.service';

register();

@Component({
  selector: 'app-clients',
  imports: [CommonModule],
  templateUrl: './clients.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements AfterViewInit {

  clients: any[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: any, private http: HttpClient, private apiService: ApiService) {}

  ngOnInit(): void {

    this.apiService.getAllClients().subscribe({
      next: (response) => {
        if (response) {
          this.clients = response.map((client: any) => ({
            name: client.name,
            logo: client.image ?? 'assets/default-logo.png',
            url: client.url
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
      const swiperEl = document.querySelector('swiper-container');
      if (swiperEl) {
        Object.assign(swiperEl, {
          slidesPerView: 1,
  // spaceBetween: 8,
          speed: 250,
          loop: true,
          autoplay: {
            delay: 3000,
          },
          pagination: {
            clickable: true,
            type: 'bullets'
          },
          navigation: false,
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
              slidesPerView: 5,
              spaceBetween: 20
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 10
            },
            1366: {
              slidesPerView: 6,
              spaceBetween: 10
            },
            1440: {
              slidesPerView: 6,
              spaceBetween: 10
            },
          }
        });

        swiperEl.initialize();
      }
    }
  }
}
