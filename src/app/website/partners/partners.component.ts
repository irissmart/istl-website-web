import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTwitter, faTiktok, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope as faEnvelopeRegular } from '@fortawesome/free-regular-svg-icons';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-partners',
  imports: [CommonModule, FontAwesomeModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.scss'
})

export class PartnersComponent implements AfterViewInit {
  faTwitter = faTwitter
  faTiktok = faTiktok
  faLinkedin = faLinkedin
  faEnvelope = faEnvelopeRegular

  partners: any[] = [];
  clients: any[] = [];

  section: any = {};
  pageId: number = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: any, private http: HttpClient, private apiService: ApiService) { }

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

    this.apiService.getAllPartners().subscribe({
      next: (response) => {
        if (response) {
          this.partners = response.map((partner: any) => ({
            name: `${partner.firstName} ${partner.lastName}`,
            title: partner.title,
            image: partner.image ?? 'assets/default-avatar.png',
            twitter: partner.twitterUrl,
            tiktok: partner.tiktokUrl,
            linkedin: partner.linkedinUrl,
            website: partner.websiteUrl,
            mail: partner.mailUrl
          }));
        }
      },
      error: (err) => {
        console.error('Error fetching Section:', err)
      }
    });

    this.apiService.getSectionsByPageId(5).subscribe({
      next: (response) => {
        this.section = response.sections;
        this.pageId = response.pageId;

      },
      error: (err) => {
        console.error('Error fetching section:', err);
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

