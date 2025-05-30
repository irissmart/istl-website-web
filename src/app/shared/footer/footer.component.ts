import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInstagram, faXTwitter, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope as faEnvelopeRegular } from '@fortawesome/free-regular-svg-icons';
import { faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

interface ContactData {
  phoneNo: string;
  email: string;
  address: string;
  mapLink?: string;
}


@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule, RouterLink, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FooterComponent {
  faTwitter = faXTwitter
  faInstagram = faInstagram
  faFacebook = faFacebook
  faYoutube = faYoutube
  faEnvelope = faEnvelopeRegular
  faPhone = faPhone
  faLocation = faLocationDot
  contactData$: Observable<ContactData>;

  pages: any[] = [];
  phoneNo: string = "";
  email: string = "";
  address: string = "";
  mapLink: string = "";

  constructor(private apiService: ApiService) {
    this.contactData$ = this.apiService.getSectionsByPageId(8).pipe(
      map(data => ({
        ...data,
        mapLink: `https://www.google.com/maps/search/?q=${encodeURIComponent(data.address)}`
      })),
      catchError(err => {
        console.error('Error fetching contact data:', err);
        return of({
          phoneNo: 'Not available',
          email: 'Not available',
          address: 'Not available'
        });
      })
    );
  }

  ngOnInit(): void {

  }
}
