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
  selector: 'app-teams',
  imports: [CommonModule, FontAwesomeModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss'
})
export class TeamsComponent {
  faTwitter = faTwitter
  faTiktok = faTiktok
  faLinkedin = faLinkedin
  faEnvelope = faEnvelopeRegular

  teamMembers: any[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: any, private http: HttpClient, private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAllTeamMembers().subscribe({
      next: (response) => {
        if (response) {
          this.teamMembers = response.map((teamMember: any) => ({
            name: `${teamMember.firstName} ${teamMember.lastName}`,
            title: teamMember.title,
            image: teamMember.image ?? 'assets/default-avatar.png',
            description: teamMember.description,
            twitter: teamMember.twitterUrl,
            tiktok: teamMember.tiktokUrl,
            linkedin: teamMember.linkedinUrl,
            mail: teamMember.mailUrl
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
          slidesPerView: 3,
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
              slidesPerView: 6,
              spaceBetween: 10
            }
          }
        });

        swiperEl.initialize();
      }
    }
  }

  toggleReadMore(member: any) {
    member.expanded = !member.expanded;
  }

  ngOnChanges(): void {
    this.teamMembers = this.teamMembers.map(member => ({
      ...member,
      expanded: false
    }));
  }

}