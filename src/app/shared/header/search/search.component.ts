import { ChangeDetectorRef, Component, HostListener, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { catchError, debounceTime, distinctUntilChanged, finalize, map, switchMap, tap } from 'rxjs/operators';
import { Subject, of, forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchQuery = '';
  searchResults: any[] = [];
  showResults = false;
  isMouseOverResults = false;
  isLoading = false;
  private searchTerms = new Subject<string>();

  constructor(
    private apiService: ApiService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {
    this.setupSearch();
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.search-container')) {
      this.showResults = false;
      this.cdRef.detectChanges();
    }
  }

  private setupSearch(): void {
    this.searchTerms.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap(term => {
        if (!term || term.length < 1) {
          this.searchResults = [];
          this.showResults = false;
          this.cdRef.detectChanges();
          return of([]);
        }

        this.searchResults = [];
        this.isLoading = true;
        this.showResults = true;
        this.cdRef.detectChanges();

        return this.searchAll(term).pipe(
          catchError(() => of([])),
          finalize(() => {
            this.isLoading = false;
            this.cdRef.detectChanges();
          })
        );
      })
    ).subscribe(results => {
      this.searchResults = results;
      this.showResults = results.length > 0 || (this.searchQuery.length > 0 && this.isLoading);
      this.cdRef.markForCheck();
      this.cdRef.detectChanges();
    });
  }

  search(term: string): void {
    this.searchQuery = term;
    this.searchTerms.next(term);
  }

  searchAll(term: string) {
    const partners$ = this.apiService.getAllPartners(1, 10, term).pipe(
      catchError(() => of([]))
    );

    const clients$ = this.apiService.getAllClients(1, 10, term).pipe(
      catchError(() => of([]))
    );

    const jobs$ = this.apiService.getAllJobs(term, null, null, false, 1, 5).pipe(
      catchError(() => of([]))
    );

    const jobCategories$ = this.apiService.getAllJobCategories(1, 5, term).pipe(
      catchError(() => of([]))
    );

    return forkJoin([partners$, clients$, jobs$, jobCategories$]).pipe(
      map(([partners, clients, jobs, jobCategories]) => {
        const combinedResults = [];

        if (partners?.length) {
          combinedResults.push(...partners.map(p => ({
            ...p,
            type: 'partner',
            id: p.id || p.partnerId,
            name: p.firstName + " " + p.lastName || 'Unknown Partner'
          })));
        }

        if (clients?.length) {
          combinedResults.push(...clients.map(c => ({
            ...c,
            type: 'client',
            id: c.id || c.clientId,
            name: c.name || c.clientName || 'Unknown Client'
          })));
        }

        if (jobs?.length) {
          combinedResults.push(...jobs.map((j: any) => ({
            ...j,
            type: 'job',
            id: j.id,
            name: j.title || 'Unknown Job'
          })));
        }

        if (jobCategories?.length) {
          combinedResults.push(...jobCategories.map((j: any) => ({
            ...j,
            type: 'jobCategory',
            id: j.id,
            name: j.jobCategoryName || 'Unknown Job Category'
          })));
        }

        return combinedResults;
      }),
      tap(() => {
        this.cdRef.detectChanges();
      })
    );
  }

  navigateToResult(result: any) {
    // Store the result data before navigation
    const resultData = { ...result };

    this.showResults = false;
    this.searchQuery = '';

    setTimeout(() => {
      switch (resultData.type) {
        case 'partner':
          this.router.navigate(['/partners'], {
            state: { highlightId: resultData.id }
          });
          break;
        case 'client':
          this.router.navigate(['/partners'], {
            queryParams: { highlight: 'client', id: resultData.id },
            state: { clientData: resultData }
          });
          break;
        case 'job':
          this.router.navigate(['/vacancy'], {
            queryParams: { highlight: 'job', id: resultData.id },
            state: { jobData: resultData }
          });
          break;
        case 'jobCategory':
          this.router.navigate(['/services'], {
            queryParams: { highlight: 'job', id: resultData.id },
            state: { jobData: resultData }
          });
          break;
      }
    }, 150);
  }

  onFocus() {
    if (this.searchQuery) {
      this.showResults = true;
      this.cdRef.detectChanges();
    }
  }

  onBlur() {
    setTimeout(() => {
      if (!this.isMouseOverResults) {
        this.showResults = false;
      }
    }, 200);
  }

  onMouseEnterResults() {
    this.isMouseOverResults = true;
  }

  onMouseLeaveResults() {
    this.isMouseOverResults = false;
  }

}
