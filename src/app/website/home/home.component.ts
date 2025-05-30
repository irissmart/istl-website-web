import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
// import { faHeadset } from '@fortawesome/free-solid-svg-icons';
// import { HeroComponent } from "./components/hero/hero.component";
// import { ServicesComponent } from "./components/services/services.component";
// import { BestServiceComponent } from "./components/best-service/best-service.component";
// import { ReachServiceComponent } from "./components/reach-service/reach-service.component"; 
// import { ProfessionalCatalogueComponent } from "./components/professional-catalogue/professional-catalogue.component";
// import { BusinessComponent } from "./components/business/business.component";
// import { ReviewComponent } from "./components/review/review.component"; 
// import { ApiService } from '../../services/api.service'; 
// import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
// import { AfterViewInit, Inject, Input, PLATFORM_ID, SimpleChanges } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { register } from 'swiper/element/bundle';
// import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
// import Swiper from 'swiper';
// import { HttpClient } from '@angular/common/http';

// HeroComponent, ServicesComponent, BestServiceComponent, ReachServiceComponent, ProfessionalCatalogueComponent, BusinessComponent, ReviewComponent

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule, FontAwesomeModule],
  templateUrl: './home.component.html',
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  // faHeadset = faHeadset;
  // pages: any[] = [];
  // sections: any[] = [];
  // pageId: number = 0;
  // faCircleCheck = faCircleCheck;
  // serviceCategories: any[] = [];
  // reviews : any[] = [];
  // faStarRegular = faStarRegular;


  // constructor(@Inject(PLATFORM_ID) private platformId: any, private http: HttpClient, private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    // this.apiService.getSectionsByPageId(9).subscribe({
    //   next: (response) => {
    //     this.sections = response.sections;
    //     this.pageId = response.pageId;
    //   },
    //   error: (err) => {
    //     console.error('Error fetching section:', err);
    //   }
    // });

    // this.apiService.getAllClientServiceCategories().subscribe({
    //   next: (response) => {
    //     if (response) {
    //       this.serviceCategories = response.map((item: any) => ({
    //         id: item.id,
    //         name: item.serviceCategoryName,
    //         description: item.description,
    //         image: item.imagePath ?? 'assets/default-image.jpg'
    //       }));
    //     }
    //   },
    //   error: (err) => {
    //     console.error('Error fetching Section:', err);
    //   }
    // });

    // this.apiService.getAllHomeTestimonials().subscribe({
    //   next: (response) => {
    //     if (response) {
    //       this.reviews = response.map(item => ({
    //         description: item.comment,
    //         by: item.clientName,
    //         designation: item.clientOccupation,
    //         image: item.imagePath
    //       }));
    //     }
    //   },
    //   error: (err) => {
    //     console.error('Error fetching Section:', err)
    //   }
    // });
  }


  // navigateToDetails(categoryId: string) {
  //   this.router.navigate(['/service-category', categoryId]);
  // }

  // ngAfterViewInit(): void {
  //   if (isPlatformBrowser(this.platformId)) {
  //     const swiperEl2 = document.querySelector('.swiper-container2') as HTMLElement & { swiper: Swiper; };
  //     if (swiperEl2) {
  //       Object.assign(swiperEl2, {
  //         slidesPerView: 3,
  //         speed: 200,
  //         loop: false,
  //         pagination: false,
  //         navigation: {
  //           nextEl: '.custom-next',
  //           prevEl: '.custom-prev',
  //         },
  //         breakpoints: {
  //           320: {
  //             slidesPerView: 2,
  //             spaceBetween: 10
  //           },
  //           640: {
  //             slidesPerView: 3,
  //             spaceBetween: 10
  //           },
  //           768: {
  //             slidesPerView: 4,
  //             spaceBetween: 10
  //           },
  //           1024: {
  //             slidesPerView: 4,
  //             spaceBetween: 10
  //           }
  //         }
  //       });
  //       // @ts-ignore
  //       swiperEl2.initialize();
  //     }
  //   }
  //   if (isPlatformBrowser(this.platformId)) {
  //     const swiperEl3 = document.querySelector('.swiper-container3') as HTMLElement & { swiper: Swiper; };
  //     if (swiperEl3) {
  //       Object.assign(swiperEl3, {
  //         slidesPerView: 1,
  //         speed: 250,
  //         loop: false,
  //         pagination: false,
  //         navigation: {
  //           nextEl: '.custom-next',
  //           prevEl: '.custom-prev',
  //         },
  //         breakpoints: {
  //           320: {
  //             slidesPerView: 1,
  //             spaceBetween: 10
  //           },
  //           640: {
  //             slidesPerView: 1,
  //             spaceBetween: 10
  //           },
  //           768: {
  //             slidesPerView: 1,
  //             spaceBetween: 10
  //           },
  //           1024: {
  //             slidesPerView: 1,
  //             spaceBetween: 10
  //           }
  //         }
  //       });
  //       // @ts-ignore
  //       swiperEl3.initialize();
  //     }
  //   }
  // }
}
