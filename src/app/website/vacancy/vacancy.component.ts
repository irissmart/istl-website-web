import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeroComponent } from '@shared/hero/hero.component';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'app/services/api.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-vacancy',
  imports: [CommonModule, HeroComponent, FormsModule],
  templateUrl: './vacancy.component.html',
  styleUrl: './vacancy.component.scss',
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        opacity: '0',
        overflow: 'hidden'
      })),
      state('expanded', style({
        height: '*',
        opacity: '1'
      })),
      transition('collapsed <=> expanded', [
        animate('0.3s ease-in-out')
      ])
    ]),
    trigger('rotateChevron', [
      state('expanded', style({
        transform: 'rotate(180deg)'
      })),
      state('collapsed', style({
        transform: 'rotate(0deg)'
      })),
      transition('expanded <=> collapsed', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})

export class VacancyComponent {
  jobs: any[] = [];
  filter: string = "";
  categories: any[] = [];
  categoryId: number = 0;
  noJobsFound: boolean = false;
  expandedJobId: number | null = null;
  sections: any[] = [];
  pageId: number = 0;

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private router: Router
  ) { }


  applyToJob(job: any): void {
    this.router.navigate(['/career'], {
      state: { selectedJob: job }
    });
  }

  toggleJobDetails(jobId: number): void {
    this.expandedJobId = this.expandedJobId === jobId ? null : jobId;
  }

  isJobExpanded(jobId: number): boolean {
    return this.expandedJobId === jobId;
  }
  filterChanged: Subject<string> = new Subject<string>();


  ngOnInit(): void {
    this.loadJobs();
    this.loadCategories();
    this.loadBannerSectionImage();

    this.filterChanged
      .pipe(
        debounceTime(100),
        distinctUntilChanged()
      )
      .subscribe((value: string) => {
        this.filter = value;
        this.loadJobs();
      });
  }

  loadBannerSectionImage(): void {
    this.apiService.getSectionsByPageId(10).subscribe({
      next: (response) => {
        this.sections = response.sections;
        this.pageId = response.pageId;
        console.log(this.sections);
        
      },
      error: (err) => {
        console.error('Error fetching section:', err);
      }
    });
  }

  loadCategories(): void {
    this.apiService.getAllJobCategories().subscribe({
      next: (response) => {
        if (response) {
          this.categories = response.map((category: any) => ({
            id: category.id,
            jobCategoryName: category.jobCategoryName,
            image: category.imagePath
          }));
        }
      },
      error: (err) => {
        console.error('Error fetching jobs:', err);
      }
    });
  }

  loadJobs(): void {
    this.apiService.getAllJobs(this.filter, this.categoryId, null, false, null, null).subscribe({
      next: (response) => {
        if (response && response.length > 0) {
          this.noJobsFound = false;
          this.jobs = response.map((job: any) => ({
            id: job.id,
            title: job.title,
            categoryId: job.jobCategoryId,
            categoryName: job.jobCategoryName,
            image: job.jobCategoryImage,
            jobTags: job.jobTags,
            iconBgColor: '#D3D3D3',
            minSalary: job.minSalary,
            maxSalary: job.maxSalary,
            city: job.city,
            country: job.country,
            daysRemaining: this.calculateDaysRemaining(job.expiresOn),
            experience: job.experienceYearsRequired,
            vacancies: job.vacancies,
            expiresOn: job.expiresOn,
            jobStatusId: job.jobStatusId,
            description: job.description,
            responsibilities: job.responsibilities,
          }));
        }
      },

      error: (err) => {
        console.error('Error fetching jobs:', err);
        if (err.status === 404) {
          this.jobs = [];
          this.noJobsFound = true;
        }
      }
    });
  }

  calculateDaysRemaining(expiresOn: string): number {
    const today = new Date();
    const expiryDate = new Date(expiresOn);
    const diff = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return diff;
  }

}
