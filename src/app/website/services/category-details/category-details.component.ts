import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '@shared/hero/hero.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-service-details',
  imports: [CommonModule, HeroComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss'
})

export class CategoryDetailsComponent implements AfterViewInit{
  serviceCategoryId!: number;
  clients: any[] = [];
  clientServices: any[] = [];
  clientServiceCategory: any = {
    catId: null,
    catName: '',
    catDescription: '',
    catImage: 'assets/default-image.jpg'
  };

  constructor(@Inject(PLATFORM_ID) private platformId: any, private route: ActivatedRoute, private router: Router, private http: HttpClient, private apiService: ApiService) {}

  ngOnInit(): void {
    this.serviceCategoryId = Number(this.route.snapshot.paramMap.get('id'));

    this.apiService.getAllClientServicesByCategoryId(this.serviceCategoryId).subscribe({
      next: (response) => {
        if (response) {
          this.clientServices = response.map((clientService: any) => ({
            id: clientService.id,
            categoryId: clientService.clientServiceCategoryId,
            name: clientService.serviceName,
            description: clientService.description,
            image: clientService.imagePath ?? 'assets/default-image.jpg'
          }));
        } else {
          this.clientServices = [];
        }
      },
      error: (err) => {
        if (err.status === 404) {
          this.clientServices = [];
        } else {
          console.error('Error fetching services of this category:', err);
        }
      }
    });

    this.apiService.getClientServiceCategoryById(this.serviceCategoryId).subscribe({
      next: (item) => {
        if (item) {
          this.clientServiceCategory = {
            catId: item.id,
            catName: item.serviceCategoryName,
            catDescription: item.description,
            catImage: item.imagePath ?? 'assets/default-image.jpg'
          };
        }
      },
      error: (err) => {
        console.error('Error fetching category:', err);
      }
    });


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
        console.error('Error fetching clients:', err)
      }
    });
  }

  navigateToDetails(serviceId: number, serviceName :string) {
    const serviceCategoryId = this.route.snapshot.paramMap.get('id');
    if (serviceCategoryId) {
        this.router.navigate([`/service-category/${serviceCategoryId}/service/${serviceId}/name/${serviceName}`]);
    }
  }

  ngAfterViewInit(): void {
      if (isPlatformBrowser(this.platformId)) {
        const swiperEl = document.querySelector('swiper-container');
        if (swiperEl) {
          Object.assign(swiperEl, {
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
