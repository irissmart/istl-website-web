import { Component, ViewChild, ElementRef, inject, AfterViewInit } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomNotificationComponent } from '../../custom-notification/custom-notification.component';

@Component({
  selector: 'app-career',
  imports: [CommonModule, ReactiveFormsModule, CustomNotificationComponent],
  templateUrl: './career.component.html',
  styleUrl: './career.component.scss'
})
export class CareerComponent implements AfterViewInit {
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

  pages: any[] = [];
  sections: any[] = [];
  pageId: number = 0;
  jobs: any[] = [];
  selectedJobId: number | null = null;
  selectedJob: any = null;
  selectedJobTags: string = '';
  selectedJobLocation: string = '';
  selectedJobSalary: string = '';
  form: FormGroup;
  selectedFile: File | null = null;
  isLoading = false;
  errorMessage: string = "";
  submitted = false;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('jobForm') jobFormElement!: ElementRef;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.required],
      jobPosition: ['', Validators.required],
      message: ['', Validators.required],
      file: [null, Validators.required]
    });

    const nav = this.router.getCurrentNavigation();
    this.selectedJob = nav?.extras?.state?.['selectedJob'] || null;

    if (this.selectedJob) {
      this.form.get('jobPosition')?.setValue(this.selectedJob.id);
      this.form.get('jobPosition')?.disable();
      this.updateJobDisplayFields();
    }
  }

  ngAfterViewInit(): void {
    if (this.selectedJob && this.jobFormElement) {
      setTimeout(() => {
        this.jobFormElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }, 50); 
    }
  }

  ngOnInit(): void {
    this.submitted = false;

    this.apiService.getSectionsByPageId(7).subscribe({
      next: (response) => {
        this.sections = response.sections
        this.pageId = response.pageId
      },
      error: (err) => {
        console.error('Error fetching Section:', err)
      }
    });

    this.apiService.getAllJobsLookup(null, null).subscribe({
      next: (response) => {
        this.jobs = response;
        if (this.selectedJobId) {
          this.form.get('jobPosition')?.setValue(this.selectedJobId);
        }
      },
      error: (err) => {
        console.error('Error fetching jobs:', err);
      }
    });
  }


  updateJobDisplayFields(): void {
    if (this.selectedJob) {
      this.selectedJobTags = this.selectedJob.jobTags
        .map((tag: any) => tag.tagName)
        .join(', ');

      this.selectedJobLocation = `${this.selectedJob.city}, ${this.selectedJob.country}`;

      this.selectedJobSalary = `$${this.selectedJob.minSalary}k - $${this.selectedJob.maxSalary}k/month`;
    }
  }

  // Update when job position changes from dropdown
  onJobPositionChange(): void {
    const jobId = this.form.get('jobPosition')?.value;
    if (jobId) {
      this.selectedJob = this.jobs.find(job => job.id === jobId);
      this.updateJobDisplayFields();
    } else {
      this.clearJobDisplayFields();
    }
  }

  clearJobDisplayFields(): void {
    this.selectedJobTags = '';
    this.selectedJobLocation = '';
    this.selectedJobSalary = '';
    this.selectedJob = null;
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
  
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.selectedFile = file;
  
      this.form.patchValue({
        file: file
      });
  
      this.form.get('file')?.updateValueAndValidity();
    }
  }
  
  onSubmit(): void {
    if (this.form.get('jobPosition')?.disabled) {
      this.form.get('jobPosition')?.enable();
    }

    if (this.form.invalid) {
      if (this.selectedJob) {
        this.form.get('jobPosition')?.disable();
      }

      this.form.markAllAsTouched();
      return;
    }

    if (!this.selectedFile) {
      this.selectedFile = null;
      return;
    }

    this.isLoading = true;
    const formValues = this.form.value;

    const formData = new FormData();
    formData.append('JobId', this.form.get('jobPosition')?.value);
    formData.append('FirstName', formValues.firstName);
    formData.append('LastName', formValues.lastName);
    formData.append('Contact', formValues.contact);
    formData.append('Email', formValues.email);
    formData.append('Message', formValues.message);
    formData.append('Document', this.selectedFile, this.selectedFile.name);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    this.apiService.AddJobApplication(formData).subscribe({
      next: response => {
        this.isLoading = false;
        this.form.reset();
        this.submitted = false;
        this.fileInput.nativeElement.value = '';
        // this.router.navigate(['/career']);
        this.showNotification('Your contact information has been saved!', 'success');
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Error Submitting Application';
        this.showNotification(this.errorMessage, 'error');
      }
    });

    this.submitted = false;
  }

  allowOnlyNumbers(event: KeyboardEvent) {
    const allowedChars = ['0','1','2','3','4','5','6','7','8','9','+','-',' '];
    const inputChar = event.key;

    if (!allowedChars.includes(inputChar)) {
      event.preventDefault();
    }
  }

  navigateToDetails(serviceId: string) {
    this.router.navigate(['/services', serviceId]);
  }
}

