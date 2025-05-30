import { Component, Input } from '@angular/core';
import { HeroComponent } from '../../shared/hero/hero.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXTwitter, faInstagram, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope as faEnvelopeRegular } from '@fortawesome/free-regular-svg-icons';
import { faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'app/services/api.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';
import { CustomNotificationComponent } from '../../custom-notification/custom-notification.component';



@Component({
  selector: 'app-contact',
  imports: [HeroComponent, FontAwesomeModule, CommonModule, FormsModule, ReactiveFormsModule, CustomNotificationComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  notificationVisible = false;
  notificationMessage = '';
  notificationType: 'success' | 'error' = 'success';

showNotification(message: string, type: 'success' | 'error' = 'success') {
  this.notificationMessage = message;
  this.notificationType = type;
  this.notificationVisible = true;

    setTimeout(() => {
      this.notificationVisible = false;
    }, 3000);
  }
  submitted = false;

  private snackBar = inject(MatSnackBar);

  faXTwitter = faXTwitter
  faInstagram = faInstagram
  faFacebook = faFacebook
  faYoutube = faYoutube
  faEnvelope = faEnvelopeRegular
  faPhone = faPhone
  faLocation = faLocationDot

  pages: any[] = [];
  id: number = 0;
  phoneNo: string = "";
  email: string = "";
  address: string = "";
  socialLinks: any[] = [];
  bannerImage: any[] = [];
  contactForm: FormGroup;
  isLoading = false;
  errorMessage: string = "";

  constructor(private apiService: ApiService, private router: Router, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: ['', { validators: Validators.required, updateOn: 'submit' }],
      lastName: ['', { validators: Validators.required, updateOn: 'submit' }],
      email: ['', { validators: [Validators.required, Validators.email], updateOn: 'submit' }],
      phoneNo: ['', Validators.required],
      message: ['', { validators: Validators.required, updateOn: 'submit' }]
    });
  }

  allowOnlyNumbers(event: KeyboardEvent) {
    const allowedChars = ['0','1','2','3','4','5','6','7','8','9','+','-',' '];
    const inputChar = event.key;

    if (!allowedChars.includes(inputChar)) {
      event.preventDefault();
    }
  }

  onSubmit() {
    this.submitted = true;

    // Mark all fields as dirty to show errors
    Object.keys(this.contactForm.controls).forEach(field => {
      const control = this.contactForm.get(field);
      control?.markAsDirty();
      control?.markAsTouched();
      control?.updateValueAndValidity();
    });

    if (this.contactForm.invalid) {
      return;
    }

    const body = {
      firstName: this.contactForm.value.firstName,
      lastName: this.contactForm.value.lastName,
      email: this.contactForm.value.email,
      phoneNo: this.contactForm.value.phoneNo,
      message: this.contactForm.value.message
    };

    this.isLoading = true;

    this.apiService.AddUserContactInformation(body).subscribe({
      next: () => {
        this.isLoading = false;
        this.contactForm.reset();

        Object.keys(this.contactForm.controls).forEach(key => {
          const control = this.contactForm.get(key);
          control?.markAsPristine();
          control?.markAsUntouched();
        });

        this.submitted = false;
        this.showNotification('Your contact information has been saved!', 'success');
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Failed to add contact information';
        this.showNotification(this.errorMessage, 'error');
      }
    });
  }

  ngOnInit(): void {
    this.submitted = false;

    this.apiService.getSectionsByPageId(8).subscribe({
      next: (response) => {
        this.id = response.id
        this.phoneNo = response.phoneNo
        this.email = response.email
        this.address = response.address
        this.socialLinks = response.socialLinks,
        this.bannerImage = response.bannerImage
      },
      error: (err) => {
        console.error('Error fetching Section:', err)
      }
    });
    

    this.contactForm.valueChanges.subscribe(() => {
      if (this.submitted) {
        Object.keys(this.contactForm.controls).forEach(field => {
          const control = this.contactForm.get(field);
          if (control?.dirty) {
            control.markAsTouched();
          }
        });
      }
    });
  }

  onPhoneInput() {
    this.contactForm.get('phoneNo')?.markAsDirty();
  }

  openLink(url: string): void {
    window.open(url, '_blank');
  }

  getIcon(platformName: string) {
    switch (platformName.toLowerCase()) {
      case 'twitter': return this.faXTwitter;
      case 'instagram': return this.faInstagram;
      case 'facebook': return this.faFacebook;
      case 'youtube': return this.faYoutube;
      default: return this.faFacebook;
    }
  }

  navigateToDetails(serviceId: string) {
    this.router.navigate(['/services', serviceId])
  }
}